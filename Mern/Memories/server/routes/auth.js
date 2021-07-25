const express = require("express");
const route = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const AccessHash = require("../models/AccessHash");
const auth = require("../middleware/auth");
const sendEmail = require("../utils/sendEmail");
const { OAuth2Client } = require("google-auth-library");

route.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user.id }).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "user error" });
  }
});

route.post(
  "/login",
  [check("email", "Please Enter valid email").isEmail(), check("password", "Password is required").not().isEmpty()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: {
          id: user._id,
        },
      };

      await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "server error 5" });
    }
  }
);

route.post("/login/forget-password", async (req, res) => {
  try {
    const email = req.body.email;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "We cannot find your account!" });
    }

    const hasHash = await AccessHash.findOne({ userId: user._id });
    if (hasHash) {
      return res.status(400).json({ msg: "reset password link already sent via Email" });
    }

    const newHash = new AccessHash({ userId: user._id });

    await newHash.save();

    //send email

    const token = newHash._id;
    const url = `${process.env.CLIENT_URL}/login/reset-password/${token}`;

    const html = `<p>We have got your reset-passowrd request ,
                    click on reset-password link for further request</p>
                    <a href=${url}>reset-password</a>`;

    await sendEmail(email, "Reset Password", html, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res
          .status(200)
          .json({ msg: "An reset password link is sent to your email, This link is only valid for 10 mins." });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error 6" });
  }
});

route.put("/login/reset-password/:token", async (req, res) => {
  try {
    const token = req.params.token;

    const password = req.body.password;

    const aHash = await AccessHash.findOne({ _id: token, expiresIn: { $gt: Date.now() } });

    if (!aHash || !aHash.userId) {
      return res.status(400).json({ msg: "This link is not valid" });
    }

    const user = await User.findOne({ _id: aHash.userId });

    if (!user) {
      return res.status(400).json({ msg: "Cannot change password because user not found" });
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    await aHash.remove();
    res.json({ msg: "password successfully changed you can login now!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error 7" });
  }
});

const client = new OAuth2Client("1056988166762-a3skpa2k22vceiukspfco1mllqmjacud.apps.googleusercontent.com");

route.post("/google-login", async (req, res) => {
  const { tokenId } = req.body;
  try {
    const response = await client.verifyIdToken({
      idToken: tokenId,
      audience: "1056988166762-a3skpa2k22vceiukspfco1mllqmjacud.apps.googleusercontent.com",
    });

    const { email_verified, email, name } = response.payload;

    const user = await User.findOne({ email });
    if (user) {
      const payload = {
        user: {
          id: user._id,
        },
      };

      await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } else {
      let password = email + process.env.JWT_SECRET;
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);

      const newUser = new User({
        name: name,
        email: email,
        password: password,
        isVerified: email_verified,
      });

      await newUser.save();

      const payload = {
        user: {
          id: newUser._id,
        },
      };

      await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error 8" });
  }
});

module.exports = route;
