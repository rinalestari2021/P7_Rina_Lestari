module.exports = (sequelize, Sequelize) => {
  const userProfile = sequelize.define("profile", {
    userId: {
      type: Sequelize.STRING,
    },
    photoProfile: {
      type: Sequelize.STRING,
    },
    userName: {
      type: Sequelize.STRING,
    },
    departement: {
      type: Sequelize.BOOLEAN,
    },
  });
  return userProfile;
};
