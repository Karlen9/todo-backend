const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");

  try {
    const currTime = Math.floor(Date.now() / 1000);

    const decodedToken = jwt.decode(token, { complete: true });
    if (decodedToken.payload.exp < currTime) {
      throw new Error("Token is invalid, please log in");
    }

    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
