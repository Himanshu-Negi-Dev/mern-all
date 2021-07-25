const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },

  text: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Post = mongoose.model("Post", PostSchema);
