const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      trim: true,
   },

   email: {
      type: String,
      required: true,
      trim: true,
   },

   password: {
      type: String,
      required: true,
      trim: true,
   },

   date: {
      type: Date,
      default: Date.now,
   },
});

module.exports = User = mongoose.model('User',UserSchema);
