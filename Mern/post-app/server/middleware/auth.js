const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  //check token
  if (!token) {
    return res.status(400).json({ msg: "No Token: authorization denied" });
  }

  //verify token
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode.user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Token is not valid" });
  }
};
