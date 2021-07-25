const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

router.get("/", auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });

    if (notes.length == 0) {
      return res.status(400).json({ msg: "There is no notes for this user" });
    }
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "server error" });
  }
});
router.post("/create", [auth, [check("text", "note can not be empty")]], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return response.status(400).json({ errors: errors.array() });
    }
    const note = new Note({
      user: req.user.id,
      text: req.body.text,
    });

    await note.save();

    res.json(note);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "server error" });
  }
});

router.patch("/update/:id", [auth, [check("text", "note can not be empty")]], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return response.status(400).json({ errors: errors.array() });
    }

    let note = await Note.findById({ _id: req.params.id });

    if (note.user.toString() !== req.user.id) {
      return res.status(404).json({ msg: "page not found" });
    }

    note = await Note.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
    res.json(note);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "server error" });
  }
});

router.delete("/remove/:id", auth, async (req, res) => {
  try {
    let note = await Note.findById({ _id: req.params.id });

    if (note.user.toString() !== req.user.id) {
      return res.status(404).json({ msg: "page not found" });
    }

    await note.remove();

    res.json({ msg: "remove succesfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "server error" });
  }
});

module.exports = router;
