const express = require("express");
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const User = require("../model/User");

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    const user = new User({
      name: req.body.name,
      avatar: result.secure_url,
      cloudinary_id: result.public_id,
    });

    await user.save();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
});

router.delete("/remove/:id", async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    await cloudinary.uploader.destroy(user.cloudinary_id);

    await user.remove();
    res.json({ msg: "Item removed successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
});

router.patch("/update/:id", upload.single("image"), async (req, res) => {
  try {

    // console.log(req.file);
    let user = await User.findById(req.params.id);
    await cloudinary.uploader.destroy(user.cloudinary_id);

    const result = await cloudinary.uploader.upload(req.file.path);
    
    const data = {
      name: req.body.name || user.name,
      avatar: result.secure_url || user.avatar,
      clodinary_id: result.public_id || user.cloudinary_id,
    };

    const updatedUser = await User.findByIdAndUpdate({ _id: req.params.id }, data, { new: true });
    res.json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
});

module.exports = router;
