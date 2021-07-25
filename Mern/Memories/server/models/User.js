const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    require: true,
  },

  email: {
    type: String,
    trim: true,
    unique: true,
    require: true,
  },

  password: {
    type: String,
    require: true,
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  date: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
