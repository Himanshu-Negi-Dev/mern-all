const mongoose = require("mongoose");

const pendingUserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
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

const PendingUser = mongoose.model("PendingUser", pendingUserSchema);
module.exports = PendingUser;
