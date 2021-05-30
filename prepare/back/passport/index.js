const passport = require('passport');
const local = require('./local');
const { User } = require('../models');

module.exports = () => {
  // 초기 접근시 사용자 정보 은닉화
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // 이후 호출 부터 사용자 정보 복구
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