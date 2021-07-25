const express = require("express");
const route = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const Post = require("../models/Post");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

route.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ _id: -1 });
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error 1" });
  }
});

route.get("/my-memories", auth, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id });
    console.log(req.user);
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "my error" });
  }
});

route.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById({ _id: req.params.id });
    res.json(post);

    // console.log(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error 2" });
  }
});

route.post(
  "/create-memory",
  [auth, upload.single("image"), [check("text", "Please tell us something about your memory")]],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const result = await cloudinary.uploader.upload(req.file.path);
      // console.log(result);

      const newPost = new Post({
        user: req.user.id,
        text: req.body.text,
        avatar: result.secure_url,
        cloudinary_id: result.public_id,
      });

      await newPost.save();

      res.json(newPost);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "server error 3" });
    }
  }
);

route.delete("/remove/:id", auth, async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    if (!post) {
      return res.status(400).json({ msg: "post not found!" });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(400).json({ msg: "page not found, Unauthorized request" });
    }

    await cloudinary.uploader.destroy(post.cloudinary_id);
    await post.remove();
    res.json({ msg: "Delete Successfull!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error 4" });
  }
});

route.put("/update/:id", [auth, upload.single("image")], async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    if (!post) {
      return res.status(400).json({ msg: "Post not found!" });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(400).json({ msg: "page not found, Unauthorized request" });
    }

    await cloudinary.uploader.destroy(post.cloudinary_id);

    const result = await cloudinary.uploader.upload(req.file.path);

    const data = {
      text: req.body.text || post.text,
      avatar: result.secure_url || post.avatar,
      cloudinary_id: result.cloudinary_id || post.cloudinary_id,
    };

    const updatedPost = await Post.findByIdAndUpdate({ _id: req.params.id }, data, { new: true });
    res.json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error 4" });
  }
});

module.exports = route;
