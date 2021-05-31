module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    // id가 기본적으로 들어있다
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    // 모델에 대한 셋팅 영역
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci', // 이모티콘 저장
  });
  Post.associate = (db) => {
    db.Post.belongsTo(db.User); // post.addUser, post.getUser, post.setUser
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' }); // post.addHashtags
    db.Post.hasMany(db.Comment); // post.addComments, post.getComments
    db.Post.hasMany(db.Image); // post.addImages, post.getImages
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers'}) // post.addLikers, psot.removeLikers
    db.Post.belongsTo(db.Post, { as: 'Retweet'}); // post.addReweet
  };
  return Post;
};
