module.exports = (app) => {
  const userProfile = require("../controllers/users.controller.js");
  const router = require("express").Router();

  // Create a new userProfile
  router.post("/", userProfile.create);

  // Retrieve all userProfile
  router.get("/", userProfile.findAll);

  // Retrieve all userProfile
  router.get("/profile", userProfile.findAllProfile);

  // Retrieve a single userProfile  with id
  router.get("/:id", userProfile.findOne);

  // Update a userProfile with id
  router.put("/:id", userProfile.update);

  // Delete a userProfile with id
  router.delete("/:id", userProfile.delete);

  // Delete all userProfile
  router.delete("/", userProfile.deleteAll);

  app.use("/api/userProfile", router);
};
