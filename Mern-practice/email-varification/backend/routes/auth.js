const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const User = require("../models/User");
const PendingUser = require("../models/PendingUser");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");

router.get("/", (req, res) => {
  res.send("heloo from routes");
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const reg_user = await User.findOne({ email });
    const pen_user = await PendingUser.findOne({ email });

    if (reg_user || pen_user) {
      return res.status(400).json({ msg: "email already registred" });
    }

    const newUser = new PendingUser({
      username,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();
    //send email
    const token = newUser._id;
    const url = `${process.env.CLIENT_URL}/api/activate/${token}`;

    const html = `<h1>hello welcome to xyz website</h1>
                <p>please click on this link to verify your account  <a  href="${url}">"${url}"</a> </p>`;

    await sendEmail(newUser.email, "Verify Email", html, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ msg: `An Email sent to your ${email} please verify your account` });
      }
    });

    // console.log(newUser.data);
    // console.log(newUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "server error" });
  }
});

router.get("/activate/user/:token", async (req, res) => {
  try {
    const token = req.params.token;
    // console.log(token);
    const user = await PendingUser.findOne({ _id: token });
    // console.log(user);
    const newUser = new User({
      username: user.username,
      email: user.email,
      password: user.password,
      isVerified: true,
    });
    await newUser.save();
    await user.remove();
    res.json({ msg: "user is verified" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
