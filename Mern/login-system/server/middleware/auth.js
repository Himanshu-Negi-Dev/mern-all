const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
   const token = req.header("x-auth-token");

   if (!token) {
      return res.status(401).json({ msg: "No Token, Authorization Denied" });
   }

   try {
       const decode = jwt.verify(token,process.env.JWT_SECRET);
       req.user = decode.user;
       next();
   } catch (err) {
    console.log(error.message);
    res.status(500).json({ msg: "Token is not valid" });
   }
};
