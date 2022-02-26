module.exports = (sequelize, Sequelize) => {
  const userProfile = sequelize.define(
    "profile",
    {
      id: {
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

      postImageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "/images",
      },

      postBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Post",
          key: "id",
        },
      },

      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: userProfile,
          key: "id",
        },
      },
    },
    Comments.sync()
      .then(() => console.log("Comment added"))
      .catch((error) => console.log(error))
  );
  return comments;
};
