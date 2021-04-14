const router = require("express").Router();
const { User } = require("../models");
const dotenv = require("dotenv").config();
const bcrypt = require("bcryptjs");
const { validationResult, check } = require("express-validator");
const jwt = require("jsonwebtoken");
const SECRET = process.env.TOKEN_SECRET;

function generateAccsessToken(user) {
  return jwt.sign(user, SECRET, { expiresIn: "30s" });
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
      res.status(400).json({ error: "No such user" });
    } else {
      if (!bcrypt.compareSync(req.body.password, currUser.password)) {
        res.status(400).json({ error: "Invalid password" });
      } else {
        const user = { id: currUser.id };
        const accessToken = generateAccsessToken(user);

        res.json({ accessToken: accessToken });
      }
    }
  }
);

module.exports = route;
