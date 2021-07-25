const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  todo: {
    type: String,
    require: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Todo = mongoose.model("Todo", todoSchema);
