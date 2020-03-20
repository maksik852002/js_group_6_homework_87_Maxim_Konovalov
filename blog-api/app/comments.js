const express = require("express");
const Comment = require("../models/Comment");
const auth = require("../authMiddleware");
const router = express.Router();
 
router.get("/", async (req, res) => {
  try {
    let comments;
    if (req.query.post) {
      comments = await Comment.find({ post: req.query.post }).sort({datetime: -1}).limit(50).populate('user', 'username');
    } else {
      comments = await Comment.find().limit(50).sort({datetime: -1}).limit(50).populate('user', 'username');
    }
    res.send(comments);
  } catch (e) {
    res.status(422).send(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    res.send(comment);
  } catch (e) {
    res.status(404).send({ message: "Not Found" });
  }
});

router.post("/", auth, async (req, res) => {
  req.body.user = req.user._id
  const comment = new Comment(req.body);
  try {
    await comment.save();
    res.send({ id: comment._id });
  } catch (e) {
    res.status(422).send(e);
  }
});

module.exports = router;
