const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const auth = require("../middleware/auth");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");

//get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
});

// get single post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
});

//create post
router.post("/", [auth, [check("text", "Enter text").not().isEmpty()]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const curr_user = await User.findById(req.user.id);
    const newPost = new Post({
      user: req.user.id,
      text: req.body.text,
      name: curr_user.name,
    });

    console.log(newPost);
    await newPost.save();
    res.json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
});

//update post
router.put("/:id", [auth, [check("text", "Enter text").not().isEmpty()]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "page not found" });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: " user not authorized" });
    }
    post = await Post.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
});

//delete post
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "page not found" });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: " user not authorized" });
    }
    await post.remove();
    res.json({ msg: "post removed" });
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "page not found" });
    }
    res.status(500).json({ msg: "server error" });
  }
});

module.exports = router;
