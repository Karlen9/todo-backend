const { validationResult } = require("express-validator");

module.exports = function validate(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new Error(errors.array()[0].msg);
  }
};
