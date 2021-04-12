const jwt = require("jsonwebtoken");

const SECRET = process.env.TOKEN_SECRET;

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");

  try {
    console.log(1);
    const decoded = jwt.verify(token, "secret");
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};
