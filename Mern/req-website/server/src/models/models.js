const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
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

   phone: {
      type: Number,
      required: true,
   },

   message: {
      type: String,
      required: true,
      trim: true,
   },

   date: {
      type: Date,
      default: new Date().getTime(),
   },
});

const Request = new mongoose.model("Request", requestSchema);
module.exports = Request;
