const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
});

module.exports = Todo = mongoose.model("Todo", todoSchema);
