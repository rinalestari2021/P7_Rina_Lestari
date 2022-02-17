const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json

app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded

app.use(express.urlencoded({ extended: true }));
// simple route

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Groupomania application." });
});

// set port, listen for requests
require("./app/routes/users.routes")(app);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.use();
const db = require("./app/models");
db.sequelize.sync({ force: true });
