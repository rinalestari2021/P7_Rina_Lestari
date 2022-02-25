const db = require("../models");
const Post = models.posts;

const fs = require("fs"); //The fs module enables interacting with the file system in a way modeled on standard POSIX functions.
const { throws } = require("assert"); //The assert module provides a set of assertion functions for verifying invariants.

//Create post
exports.createPost = (req, res, next) => {
  const postObject = JSON.parse(req.body.post);
  const post = new Post({
    ...postObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    postBy: req.body.userName,
    postTitle: req.body.postTitle,
    postCreator: req.body.userId,
    postImageUrl: imageUrl,
  });
  post
    .save()
    .then(() => res.status(201).json({ message: "Post reated !" }))
    .catch((error) => res.status(400).json({ error }));
};

//Retrieve one post
exports.getOnePost = (req, res) => {
  const id = req.params.userId;
  Post.findByPk(userId)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find post form id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving post from id=" + userId,
      });
    });
};

//get all post
exports.getAllPost = (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

//modify post
exports.modifyPost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (post.userId != req.token) {
        res.status(403).json({ message: "Not authorized" });
      }
      //Function security only the owner of object can do the modification
      if (req.file) {
        const filename = post.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          const postObject = {
            ...req.body,
            imageUrl: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          };
          Post.updateOne(
            { _id: req.params.id },
            { ...postObject, _id: req.params.id }
          )
            .then(() => res.status(200).json({ message: "Post updated!" }))
            .catch((error) => res.status(400).json({ error }));
        });
      }
      if (!req.file) {
        Post.updateOne(
          { _id: req.params.id },
          { ...req.body, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Post modified !" }))
          .catch((error) => res.status(403).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

// Delete post
exports.deletePost = (req, res) => {
  const id = req.params.userId;
  Post.destroy({
    where: { id: req.params.id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Post deleted!",
        });
      } else {
        res.send({
          message: `Cannot delete post from id=${userId}!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot delete post from id=" + userId,
      });
    });
};
