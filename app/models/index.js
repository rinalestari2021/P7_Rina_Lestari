const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");

//Configuration Sequelize
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!");
});

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === "usersprofile.js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

const db = require("./models");
const { append } = require("express/lib/response");

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//import database
db.users = require("./models/usersprofile.js")(sequelize, Sequelize);
db.posts = require("./models/posts.js")(sequelize, Sequelize);
db.comments = require("./models/comments.js")(sequelize, Sequelize);

db.posts.belongTo(db.users, { onDelete: "CASCADE" });
db.users.hasMany(db.posts);
db.comments.belongTo(db.users, { onDelete: "CASCADE" });
db.comments.belongTo(db.posts, { onDelete: "CASCADE" });
db.posts.hasMany(db.comments);
db.users.hasMany(db.comments);

module.exports = db;
