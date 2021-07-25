const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
   {
      title: {
         type: String,
         trim: true,
         min: 3,
         max: 180,
         required: true,
      },

      slug: {
         type: String,
         unique: true,
         index: true,
         lowercase: true,
      },

      content: {
         type: {},
         required: true,
         min: 3,
         max: 2000000,
      },

      user: { type: String, default: "admin" },
   },
   { timestamps: true }
);

module.exports = new mongoose.model("Post", postSchema);
