const db = require("../models");
const userProfile = db.groupomania;
const Op = db.Sequelize.Op;
// Create and Save a new user profile
exports.create = (req, res) => {
  // Validate request
  if (!req.body.userName) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a user profile
  const profile = {
    userId: req.body.userId,
    userName: req.body.userName,
    departement: req.body.departement,
  };
  // Save new profile in the database
  userProfile
    .create(profile)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the new user profile.",
      });
    });
};

// Retrieve all users profile from the database.
exports.findAll = (req, res) => {
  const title = req.query.userName;
  var condition = userName
    ? { userName: { [Op.like]: `%${userName}%` } }
    : null;
  userProfile
    .findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving userProfile.",
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.userId;
  userProfile
    .findByPk(userId)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + userId,
      });
    });
};

// Update a users profile by the id in the request
exports.update = (req, res) => {
  const id = req.params.userId;
  userProfile
    .update(req.body, {
      where: { id: userId },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "user profile was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update user profile with id=${userId}!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating user profile with id=" + userId,
      });
    });
};

// Delete a users profile with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.userId;
  userProfile
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User profile was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete user profile with id=${userId}!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete user profile with id=" + userId,
      });
    });
};

// Delete all users profile from the database.
exports.deleteAll = (req, res) => {
  userProfile
    .destroy({
      where: {},
      truncate: false,
    })
    .then((nums) => {
      res.send({ message: `${nums} User profile were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all user profile.",
      });
    });
};

// Find all published users profile
exports.findAllProfile = (req, res) => {
  userProfile
    .findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user profile.",
      });
    });
};
