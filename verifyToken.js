const jwt = require("jsonwebtoken");

const SECRET = process.env.TOKEN_SECRET;

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send("Access Denied");
  }

  try {
    const verified = jwt.verify(token, "secret");
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid Token" });
  }
};
