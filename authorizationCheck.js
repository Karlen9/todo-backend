const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  const SECRET = process.env.TOKEN_SECRET;

  const verifyToken = jwt.verify(token, SECRET);

  if (!verifyToken && req.query.id !== verifyToken.id) {
    return res.status(401).json({ error: "Invalid Token" });
  }

  next();
};
