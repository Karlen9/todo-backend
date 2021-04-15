const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");

  const currTime = Math.floor(Date.now() / 1000);

  const decodedToken = jwt.decode(token, { complete: true });
  console.log(decodedToken);
  if (decodedToken && decodedToken.payload.exp > currTime) {
    next();
  } else {
    res.status(401).json({ error: "Invalid Token" });
  }
};
