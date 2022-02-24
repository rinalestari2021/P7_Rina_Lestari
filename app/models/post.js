module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define(
    "post",
    {
      postTitle: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notempty: true,
        },
      },
      postBy: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notempty: true,
        },
      },
      postImageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "/images",
      },
      about: {
        type: Sequelize.STRING,
      },
      postCreator: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notempty: true,
        },
      },
    },
    sequelize,
    tableName,
    "Groupomania",
    modelName,
    "Post"
  );
  return Post;
};
