module.exports = (app) => {
  const userProfile = require("../controllers/users.controller.js");
  const router = require("express").Router();

  // Create a new userProfile
  router.post("/", userProfile.create);

  // Retrieve all userProfile
  router.get("/", userProfile.findAll);

  // Retrieve all userProfile
  router.get("/user.controller", userProfile.findAllProfile);

  // Retrieve a single userProfile  with id
  router.get("/user.controller", userProfile.findOne);

  // Update a userProfile with id
  router.put("/user.controller", userProfile.update);

  // Delete a userProfile with id
  router.delete("/user.controller", userProfile.delete);

  // Delete all userProfile
  router.delete("/user.controller", userProfile.deleteAll);

  app.use("/api/userProfile", router);
};
