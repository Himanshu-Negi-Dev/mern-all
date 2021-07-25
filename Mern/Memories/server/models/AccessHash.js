const mongoose = require("mongoose");

const accessHashSchema = new mongoose.Schema({
  userId: {
    type: String,
    trim: true,
  },

  expiresIn: {
    type: Date,
    default: Date.now() + 10 * (60 * 1000),
  },
});

const AccessHash = mongoose.model("AccessHash", accessHashSchema);
module.exports = AccessHash;
