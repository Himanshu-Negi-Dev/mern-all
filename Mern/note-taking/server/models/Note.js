const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },

  text: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Note = mongoose.model("Note", noteSchema);
