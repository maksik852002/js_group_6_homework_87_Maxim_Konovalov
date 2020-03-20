const path = require("path");
const express = require("express");
const multer = require("multer");
const nanoid = require("nanoid");
const auth = require("../authMiddleware");

const config = require("../config");
const Post = require("../models/Post");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

const router = express.Router();

router.get("/", async (req, res) => {
  console.log(req.query)
  try {
    const posts = await Post.find().sort({datetime: -1}).limit(50).populate('user', 'username');
    res.send(posts);
  } catch (e) {
    res.status(422).send(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('user', 'username');
    res.send(post);
  } catch (e) {
    res.status(404).send({ message: "Not Found" });
  }
});

router.post("/", auth, upload.single("image"), async (req, res) => {

  try {
    req.body.user = req.user._id
    const post = new Post(req.body);
    if (req.file) {
      post.image = req.file.filename;
    }
    await post.save();
    res.send({ id: post._id });
  } catch (e) {
    console.log(e)
    res.status(422).send(e);
  }
});

module.exports = router;
