const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
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

module.exports = User = mongoose.model("User", userSchema);
