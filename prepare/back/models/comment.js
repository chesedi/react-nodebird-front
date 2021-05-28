module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    // id가 기본적으로 들어있다
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // UserId: 1
    // PostId: 3
  }, {
    // 모델에 대한 셋팅 영역
    charset: 'utf8mb4',
    collate: 'utf8_general_ci', // 이모티콘 저장
  });
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User); // 실제컬럼이 생김
    db.Comment.belongsTo(db.Post);
  };
  return Comment;
};
