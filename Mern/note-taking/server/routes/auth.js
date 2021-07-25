const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/Users");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
});

router.post(
  "/login",
  [check("email", "please enter valid email").isEmail(), check("password", "password is required").exists()],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      let user = await User.findOne({ email: email });

      if (!user) {
        return res.status(400).json({ errors: [{ msg: "invalid credentials" }] });
      }

      let isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: "invalid credentials" }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" }, (err, token) => {
        if (err) throw err;
        res.json({ token: token });
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
    }
  }
);

module.exports = router;
