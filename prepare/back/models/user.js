module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    // MySQL에는 users 테이블 생성
    // 소문자 + _s 가 붙음
    // id가 기본적으로 들어있다
    email: {
      type: DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
      allowNull: false, // 필수
      unique: true, // 고유한 값
    },
    nickanme: {
      type: DataTypes.STRING(30),
      allowNull: false, // 필수
    },
    password: {
      type: DataTypes.STRING(100), // 암호화 때문에 용량을 늘려놓음
      allowNull: false, // 필수
    },
  }, {
    // 모델에 대한 셋팅 영역
    charset: 'utf8',
    collate: 'utf8_general_ci', // 한글 저장
  });
  User.associate = (db) => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    // 중간 테이블 이름 바꾸기
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' })
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' })
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId'})
  };
  return User;
};
