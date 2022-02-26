module.exports = (sequelize, Sequelize) => {
  const userProfile = sequelize.define(
    "profile",
    {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: userProfile,
          key: "id",
        },
      },

      userName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notempty: true,
        },
      },

      imageProfile: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "/images",
      },
      about: {
        type: Sequelize.STRING,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        required: true,
      },

      password: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
      },

      roleStatus: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notempty: true,
        },
        defaultValue: "staff",
      },
    },
    Post.sync()
      .then(() => console.log("User created"))
      .catch((error) => console.log(error))
  );
  return userProfile;
};
