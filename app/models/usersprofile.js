module.exports = (sequelize, DataTypes) => {
  const userProfile = sequelize.define("profile", {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notempty: true,
      },
    },
    imageProfile: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "/images",
    },
    about: {
      type: DataTypes.STRING,
    },
    roleStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notempty: true,
    },
      defaultValue: "staff",
      },
    },
    sequelize,
    tableName: "Groupomania",
    modelName: "userProfile",
  });
  return userProfile;
};
