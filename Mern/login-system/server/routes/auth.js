const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

router.post(
  "/login",
  [check("email", "email enter valid email").isEmail(), check("password", "passowrd is required").exists()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, passowrd } = req.body;

    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(passowrd, user.passowrd);
      if (!isMatch) {
        res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
