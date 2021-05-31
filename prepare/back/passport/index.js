const passport = require('passport');
const local = require('./local');
const { User } = require('../models');

module.exports = () => {
  // 초기 접근시 사용자 정보 은닉화
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // 라우터 접근 전에 해당 함수를 실행함
  // So, 이후 호출 부터 사용자 정보에 접근이 가능
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id }});
      done(null, user);
    } catch (error) {
      console.error(error);
      done(error);
    }

  });

  local();
}