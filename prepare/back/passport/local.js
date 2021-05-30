const passport = require('passport');
const { Strategy: LocalStrategy }  = require('passport-local');
const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'email', // req.body.eamil
    passwordField: 'password' // req.body.password
  }, async (email, password, done) => {
    try {
      // 로그인 전략 세우기
      const user = await User.findOne({
        where: { email }
      });
      if (!user){
        // 첫번째 서버 에러, 두번째 성공, 세번째 클라이언트 에러
        return done(null, false, { reason: '존재하지 않는 이메일입니다!' });
      }
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        // 성공에 사용자 정보 넘겨주기
        return done(null, user);
      }
      return done(null, false, { reason: '비밀번호가 틀렸습니다' });
    } catch (error) {
      console.error(error);
      // 서버 에러 처리
      return done(error);
    }

  }));
};