const express = require("express");
const route = express.Router();
const bcrypt = require("bcryptjs");
const PendingUser = require("../models/PendingUser");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");
const AccessHash = require("../models/AccessHash");

route.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const pUser = await PendingUser.findOne({ email });
    const rUser = await User.findOne({ email });

    if (pUser || rUser) {
      res.status(400).json({ msg: "User already exist!!" });
    }

    const newUser = new PendingUser({
      username,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();

    const url = `${process.env.CLIENT_URL}/auth/verify-user/${newUser._id}`;

    const html = `<h1>Welcome to Auth System</h1>
                <p>Click on this link to verify your account <a href=${url}> ${url} </a> </p>`;

    await sendEmail(newUser.email, "veriy your account", html, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ msg: "An email is sent to your email please verify your email" });
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Server error" });
  }
});

route.get("/verify-user/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const user = await PendingUser.findOne({ _id: token });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Token" });
    }

    const newUser = new User({
      username: user.username,
      email: user.email,
      password: user.password,
      isVerified: true,
    });
    await newUser.save();
    await user.remove();
    res.json({ msg: "account verified" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
});

route.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Your account is not valid or maybe not verified!!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const payload = {
      user: {
        id: user._id,
      },
    };

    await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" }, (err, token) => {
      if (err) throw error;
      res.json({ token });
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "server error" });
  }
});

route.post("/login/forget-password", async (req, res) => {
  try {
    const email = req.body.email;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "This account not exist" });
    }

    const hasHash = await AccessHash.findOne({ userId: user._id });

    if (hasHash) {
      return res.status(400).json({ msg: "reset password link is already sent" });
    }

    const newHash = new AccessHash({ userId: user._id });
    await newHash.save();

    //send email
    const token = newHash._id;

    const url = `${process.env.CLIENT_URL}/login/reset-password/${token}`;

    const html = `<h1>Reset Password</h1>
                  <p>You have generated the request for reset password please click on this link 
                  <a href=${url}>${url}</a>
                  </p>`;

    sendEmail(user.email, "Reset Password", html, (error, data) => {
      if (error) {
        console.log(error);
      } else {
        res.json({ msg: "An email is sent tou your account" });
      }
    });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

route.put("/login/reset-password/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const { password } = req.body;

    const aHash = await AccessHash.findOne({ _id: token, expiresIn: { $gt: Date.now() } });
    console.log(aHash);
    if (!aHash || !aHash.userId) {
      return res.status(400).json({ msg: "Cannot reset password because hash not found" });
    }

    const user = await User.findOne({ _id: aHash.userId });
    console.log(user);
    if (!user) {
      return res.status(400).json({ msg: "Cannot reset password because user not found" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    await aHash.remove();
    res.json({ msg: "password reset successfull" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error!!" });
  }
});

module.exports = route;
