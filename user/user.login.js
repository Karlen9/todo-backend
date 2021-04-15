const router = require("express").Router();
const { User } = require("../models");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const { validationResult, check } = require("express-validator");
const jwt = require("jsonwebtoken");
const SECRET = process.env.TOKEN_SECRET;

function generateAccsessToken(user) {
  return jwt.sign(user, SECRET, { expiresIn: "500s" });
}

const route = router.post(
  "/login",
  check("password").not().isEmpty().withMessage("Write password"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }
    const currUser = await User.findOne({ where: { email: req.body.email } });

    if (!currUser) {
      return res.status(400).json({ error: "No such user" });
    }
    if (!bcrypt.compareSync(req.body.password, currUser.password)) {
      return res.status(400).json({ error: "Invalid password" });
    }
    const user = { id: currUser.id };
    const accessToken = generateAccsessToken(user);

    res.json({ accessToken: accessToken });
  }
);

module.exports = route;
