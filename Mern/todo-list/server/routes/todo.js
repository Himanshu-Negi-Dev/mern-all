const router = require("express").Router();
const Todo = require("../models/todo");

router.post("/", async (req, res) => {
  try {
    const newItem = new Todo({
      item: req.body.item,
    });
    await newItem.save();
    res.json(newItem);
  } catch (err) {
    res.status(500).json({ msg: "server error" });
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const items = await Todo.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ msg: "server error" });
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await Todo.findById({ _id: req.params.id });
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: "server error" });
    console.log(err);
  }
});
router.put("/:id", async (req, res) => {
  try {
    const data = await Todo.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: "server error" });
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await Todo.findByIdAndRemove({ _id: req.params.id });
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: "server error" });
    console.log(err);
  }
});

module.exports = router;
