const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  text: {
    type: String,
    trim: true,
    required: true,
  },

  avatar: {
    type: String,
    required: true,
  },

  cloudinary_id: {
    type: String,
    required: true,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
