const db = require("../models");
const Comments = models.comments;

const fs = require("fs"); //The fs module enables interacting with the file system in a way modeled on standard POSIX functions.
const { throws } = require("assert"); //The assert module provides a set of assertion functions for verifying invariants.

//Create comment
exports.createComment = (req, res, next) => {
  const commentObject = JSON.parse(req.body.post);
  const comment = new Comment({
    ...commentObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    postId: req.body.postId,
    postBy: req.body.userName,
    postTitle: req.body.postTitle,
    postCreator: req.body.userId,
    postImageUrl: imageUrl,
  });
  comment
    .save()
    .then(() => res.status(201).json({ message: "Comment added !" }))
    .catch((error) => res.status(400).json({ error }));
};

//Retrieve one comment
exports.getOneComment = (req, res) => {
  const id = req.params.userId;
  Comment.findByPk(userId)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find comment form id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving comment from id=" + userId,
      });
    });
};

//get all comments
exports.getAllComments = (req, res, next) => {
  Comment.find()
    .then((comments) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

//modify comment
exports.modifyComment = (req, res, next) => {
  Comment.findOne({ _id: req.params.id })
    .then((comment) => {
      if (comment.userId != req.token) {
        res.status(403).json({ message: "Not authorized" });
      }
      //Function security only the owner of object can do the modification
      if (req.file) {
        const filename = post.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          const commentObject = {
            ...req.body,
            imageUrl: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          };
          Comment.updateOne(
            { _id: req.params.id },
            { ...commentObject, _id: req.params.id }
          )
            .then(() => res.status(200).json({ message: "Comment updated!" }))
            .catch((error) => res.status(400).json({ error }));
        });
      }
      if (!req.file) {
        Comment.updateOne(
          { _id: req.params.id },
          { ...req.body, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Comment modified !" }))
          .catch((error) => res.status(403).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

// Delete comment
exports.deleteComment = (req, res) => {
  const id = req.params.userId;
  Comment.destroy({
    where: { id: req.params.id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Comment deleted!",
        });
      } else {
        res.send({
          message: `Cannot delete comment from id=${userId}!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Cannot delete comment from id=" + userId,
      });
    });
};
