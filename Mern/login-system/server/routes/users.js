const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post(
   "/register",
   [
      check("name", "name is required!").not().isEmpty(),
      check("email", "please enter a valid email!").isEmail(),
      check("password", "please enter password of minimum leangh 6").isLength({ min: 6 }),
   ],
   async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password } = req.body;

      try {
         let user = await User.findOne({ email: email });
         if (user) {
           return res.status(400).json({ errors: [{ msg: "user already exist!" }] });
         }

         user = new User({
            name: name,
            email: email,
            passowrd: password,
         });

         const salt = await bcrypt.genSalt(10);
         user.password = await bcrypt.hash(password, salt);
         await user.save();

         const payload = {
            user: {
               id: user.id,
            },
         };

         jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: '1d'},(err,token)=>{
             if (err) throw err;
             res.json({token});
         })
      } catch (err) {
         console.log(err);
         res.status(500).json(err.message);
      }
   }
);

module.exports = router;
