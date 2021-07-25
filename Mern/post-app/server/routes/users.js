const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
router.post(
  "/register",
  [
    check("name", "name is required!").not().isEmpty(),
    check("email", "please enter valid email!").isEmail(),
    check("password", "password should be min 6 Characters").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });

      //check user
      if (user) {
        return res.status(400).json({ errors: [{ msg: "user aleady exist" }] });
      }

      //create user
      user = new User({
        name: name,
        email: email,
        password: password,
      });

      //hash password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      //save user
      await user.save();

      //create payload
      const payload = {
        user: {
          id: user._id,
        },
      };

      //create and return jwt
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" }, (err, token) => {
        if (err) throw err;
        return res.status(200).json({ token });
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "server error" });
    }
  }
);

module.exports = router;
