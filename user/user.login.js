const router = require("express").Router();
const { User } = require("../models");
const dotenv = require("dotenv").config();
const bcrypt = require("bcryptjs");
const { validationResult, check } = require("express-validator");
const jwt = require("jsonwebtoken");
const TOKEN_SECRET = process.env.TOKEN_SECRET;

function generateAccsessToken(user) {
  return jwt.sign(user, "secret", { expiresIn: "200s" });
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

    try {
      if (!currUser) throw new Error("Email is already in use");

      try {
        if (!bcrypt.compare(req.body.password, currUser.password))
          throw new Error("Wrong password");
        const user = { id: currUser.id };
        const accessToken = generateAccsessToken(user);

        res.json({ accessToken: accessToken });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = route;
