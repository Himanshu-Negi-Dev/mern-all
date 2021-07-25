const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      trim: true,
    },

    email: {
      type: String,
      require: true,
      trim: true,
    },

    password: {
      type: String,
      require: true,
      trim: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
