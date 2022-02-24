//Creates an Express application.
const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post.js");
const router = require("express").Router();

const userCtrl = require("../controllers/post");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer");

router.get("/", auth, postCtrl.getAllPost);
router.post("/", auth, multer, postCtrl.createPost);
router.get("/:id", auth, postCtrl.getOnePost);
router.put("/:id", auth, multer, postCtrl.modifyPost);
router.delete("/:id", auth, postCtrl.deletePost);

module.exports = router;
