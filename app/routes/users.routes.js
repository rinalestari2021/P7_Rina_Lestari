module.exports = (app) => {
  const express = require("express"); //Creates an Express application.
  const router = express.Router(); //Create separate routers for each main route.

  const userCtrl = require("../controllers/users.controller");
  const auth = require("../middleware/auth");
  const multer = require("../middleware/multer");

  router.post("/signup", userCtrl.signup);
  router.post("/login", userCtrl.login);

  // Create a new userProfile
  router.post("/", auth, userProfile.create);

  // adding image
  router.post("/", auth, multer, userCtrl.create);

  // Retrieve all userProfile
  router.get("/", auth, userCtrl.findAll);

  // Retrieve a single userProfile  with id
  router.get("/:id", auth, userCtrl.findOne);

  // Update a userProfile with id
  router.put("/:id", auth, userCtrl.update);

  // Delete all userProfile
  router.delete("/:id", auth, userCtrl.deletePost);

  app.use("/api/userProfile", router);

  module.exports = router;
};
