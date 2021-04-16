const router = require("express").Router();
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const jwt = require("jsonwebtoken");
const validation = require("../validation");
require("dotenv").config();
const SECRET = process.env.TOKEN_SECRET;

function generateAccsessToken(user) {
  return jwt.sign(user, SECRET, { expiresIn: "1800s" });
}

const route = router.post(
  "/login",
  check("password").not().isEmpty().withMessage("Write password"),
  async (req, res) => {
    try {
      validation(req, res);

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
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = route;
