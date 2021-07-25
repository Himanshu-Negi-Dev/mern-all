const mongoose = require("mongoose");

const pendingUserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },

  email: {
    type: String,
    require: true,
    unique: true,
  },

  password: {
    type: String,
    require: true,
  },

  isVerified: {
    type: Boolean,
    default: false,
  },
});

const PendingUser = mongoose.model("PendingUser", pendingUserSchema);
module.exports = PendingUser;
