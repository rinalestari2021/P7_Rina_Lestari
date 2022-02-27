const express = require("express");
const app = express();
const db = require("./models");
const path = require("path");

const postRoutes = require("./routes/post.routes");
const userRoutes = require("./routes/users.routes");

// bodyParser is deprecated

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Header configuration
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Initilize database
db.sequelize.sync().then(() => {
  console.log("Database is connected");
});

// Routes configuration
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/posts", postRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
