//Creates an Express application.
const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/posts.controllers.js");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer");

router.get("/", auth, postCtrl.getPost);
router.post("/", auth, multer, postCtrl.createPost);
router.get("/:id", auth, postCtrl.getOnePost);
router.put("/:id", auth, multer, postCtrl.updatePost);
router.delete("/:id", auth, postCtrl.deletePost);
router.post("/comment", auth, postCtrl.createComment);
router.delete("/comment/:id", auth, postCtrl.deleteComment);

module.exports = router;
