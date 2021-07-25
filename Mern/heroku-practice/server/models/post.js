const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
   {
      title: {
         type: String,
         required: true,
         trim: true,
         min: 3,
         max: 100,
      },

      content: {
         type: {},
         required: true,
         trim: true,
      },

      user: {
         type: String,
         required: true,
         trim: true,
         default: "admin",
      },
   },
   { timestamps: true }
);

const Post = new mongoose.model("Post", postSchema);

module.exports = Post;
