const mongoose = require("mongoose");

const crudSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },

   lastEat: {
      type: Number,
      required: true,
   },
});

const Cruds = new mongoose.model("Cruds", crudSchema);

module.exports = Cruds;
