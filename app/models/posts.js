module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define(
    "post",
    {
      postId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      postTitle: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notempty: true,
        },
      },

      postBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Post",
          key: "id",
        },
      },

      postImageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "/images",
      },

      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: "userProfile",
          key: "id",
        },
      },
    },
    Post.sync()
      .then(() => console.log("Post created"))
      .catch((error) => console.log(error))
  );
  return Post;
};
