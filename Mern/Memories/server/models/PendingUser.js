const mongoose = require("mongoose");

const pendingUserSchema = new mongoose.Schema({
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

const PendingUser = mongoose.model("PendingUser", pendingUserSchema);

module.exports = PendingUser;
