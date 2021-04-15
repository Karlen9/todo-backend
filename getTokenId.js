const jwt = require("jsonwebtoken");

module.exports = function getTokenId(token) {
  const id = jwt.decode(token).id;
};
