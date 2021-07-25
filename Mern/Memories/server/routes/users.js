const express = require("express");
const route = express.Router();
const PendingUser = require("../models/PendingUser");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");

route.post(
  "/register",
  [
    check("name", "Name is required").notEmpty(),
    check("email", "Please enter valid email").isEmail(),
    check("password", "Password length should be 6 characters").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password } = req.body;

      const pUser = await PendingUser.findOne({ email });
      const rUser = await User.findOne({ email });

      if (pUser || rUser) {
        return res.status(400).json({ errors: [{ msg: "User already exist!" }] });
      }

      const newUser = new PendingUser({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);

      await newUser.save();
      //send email
      const url = `${process.env.CLIENT_URL}/verify-user/${newUser._id}`;

      const html = `<h1>Welcome to Memories</h1>

                  <p>You are one step away for sharing your memories with the world.</p>
                  <p>Click on this link to verify your account <a href=${url}> ${url} </a> </p>`;

      await sendEmail(newUser.email, "veriy your account", html, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.json({ msg: "An email is sent to your email please verify your email" });
        }
      });
    } catch (error) {
      res.status(500).json({ msg: "serer error 8" });
      console.log(error);
    }
  }
);

route.get("/activate-user/:token", async (req, res) => {
  try {
    const token = req.params.token;

    if (!token) {
      return res.status(400).json({ msg: " Token not available" });
    }

    const user = await PendingUser.findById({ _id: token });

    if (!user) {
      return res.status(400).json({ msg: "Invalid Token" });
    }

    const newUser = new User({
      name: user.name,
      email: user.email,
      password: user.password,
      isVerified: true,
    });

    await newUser.save();
    await user.remove();
    res.json({ msg: "account verified" });
  } catch (error) {
    res.status(500).json({ msg: "serer error 9" });
    console.log(error);
  }
});

module.exports = route;
