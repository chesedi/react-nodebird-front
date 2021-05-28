module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    // id가 기본적으로 들어있다
    src: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  }, {
    // 모델에 대한 셋팅 영역
    charset: 'utf8',
    collate: 'utf8_general_ci', // 이모티콘 저장
  });
  Image.associate = (db) => {
    db.Image.belongsTo(db.Post)
  };
  return Image;
};
