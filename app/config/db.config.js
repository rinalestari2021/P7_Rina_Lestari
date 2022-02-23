module.exports = {
  HOST: "Localhost",
  USER: "root",
  PASSWORD: "MY_PASS",
  DB: "groupomania",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
