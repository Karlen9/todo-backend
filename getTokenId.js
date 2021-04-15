const jwt = require("jsonwebtoken");

module.exports = function getTokenId(req) {
  const token = req.header("auth-token");
  const id = jwt.decode(token).id;

  return id;
};
