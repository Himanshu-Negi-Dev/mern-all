const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json(user);
  } catch (err) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
});

router.post(
  "/login",
  [check("email", "please enter valid email").isEmail(), check("password", "password is required").exists()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      //check user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ errors: [{ msg: "invalid credentials" }] });
      }

      //check password

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: "invalid credentials" }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };
      
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" }, (err, token) => {
        if (err) throw err;
        return res.status(200).json({ token });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "server error" });
    }
  }
);

module.exports = router;
