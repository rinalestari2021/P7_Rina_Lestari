const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv"); //using dotenv to manage env variables in nodejs
var corsOptions = {
  origin: "http://localhost:8081",
};

const helmet = require("helmet"); // security for express app by setting various HTTP headers
const path = require("path");
const fs = require("fs");

const passwordValidator = require("password-validator");

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.json());

// simple route
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use("/images", express.static(path.join(__dirname, "images")));

// function to make changement from here to db directly
//create
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Groupomania Messenger." });
});

// select tables from db using sequelize
app.get("/select", (req, res) => {
  userprofile
    .findAll({ where: {} })
    .then((userprofile) => {
      res.send(userprofile);
    })
    .catch((err) => {
      console.log(err);
    });
});

// insert update into db using sequelize
app.get("/insert", (req, res) => {
  userprofile
    .create({
      userName: "rina",
      imageProfile: "/",
      about: "",
      roleStatus: "staff",
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
  res.send("insert");
});

// delete from db using sequelize
app.delete("/delete", (req, res) => {
  res.send("delete");
});

app.listen(process.env.PORT, () => console.log("app is running"));

module.exports = app;
