module.exports = (sequelize, Sequelize) => {
  const userProfile = sequelize.define(
    "profile",
    {
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
      roleStatus: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notempty: true,
        },
        defaultValue: "staff",
      },
    },
    sequelize,
    tableName,
    "Groupomania",
    modelName,
    "userProfile"
  );
  return userProfile;
};
