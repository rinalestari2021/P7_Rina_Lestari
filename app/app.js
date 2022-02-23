const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:8081",
};

const helmet = require("helmet"); // security for express app by setting various HTTP headers
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv").config({ encoding: "latin1" }); //using dotenv to manage env variables in nodejs
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

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Groupomania Messenger." });
});

module.exports = app;
