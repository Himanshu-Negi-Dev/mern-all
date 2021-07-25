const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../models/Users");

router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "enter valid email").isEmail(),
    check("password", "password length should be 6 charachter").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password } = req.body;

      let user = await User.findOne({ email: email });
     
      if (user) {
        return res.status(400).json({ errors: [{ msg: "user already exist" }] });
      }

      user = new User({
        name: name,
        email: email,
        password: password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

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
