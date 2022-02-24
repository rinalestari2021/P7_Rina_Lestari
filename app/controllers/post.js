const db = require("../models");
const Post = models.posts;

exports.getOnePost = (req, res, next) => {
  db.posts
    .findOne({
      where: { id: req.params.id },
    })
    .then((post) => res.status(200).json(post))
    .catch((err) => res.status(403).json({ err: error }));
};
