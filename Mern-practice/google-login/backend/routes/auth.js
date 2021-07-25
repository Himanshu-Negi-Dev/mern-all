const express = require("express");
const route = express.Router();
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const client = new OAuth2Client("117560094941-ridhbvi1lhb1nh6lmj8k8l8s89hvnrau.apps.googleusercontent.com");
route.post("/google-login", async (req, res) => {
  const { tokenId } = req.body;

  try {
    const response = await client.verifyIdToken({
      idToken: tokenId,
      audience: "117560094941-ridhbvi1lhb1nh6lmj8k8l8s89hvnrau.apps.googleusercontent.com",
    });

    const { email_verified, email, name } = response.payload;
    console.log(response.payload);

    if (email_verified) {
      const user = await User.findOne({ email });
      if (user) {
        const payload = {
          id: user._id,
        };
        await jwt.sign(payload, "myjwtsecret", { expiresIn: "1d" }, (err, token) => {
          if (err) throw err;
          res.json({ token });
        });
      } else {
        let password = email + "myjwtsecret";
        let newUser = new User({
          name: name,
          email: email,
          password: password,
          email_verified: email_verified,
        });
        await newUser.save();

        const payload = {
          id: newUser._id,
        };
        await jwt.sign(payload, "myjwtsecret", { expiresIn: "1d" }, (err, token) => {
          if (err) throw err;
          res.json({ token });
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
});

module.exports = route;
