const express = require("express");
const router = express.Router();
const Todo = require("../models/todos");
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById({ _id: req.params.id });
    res.json(todo);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/create", async (req, res) => {
  try {
    const newTodo = new Todo({
      todo: req.body.todo,
    });

    const todo = await newTodo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
    res.json(todo);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/remove/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete({ _id: req.params.id });
    res.json({ msg: "item removed" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
