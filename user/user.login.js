const router = require("express").Router();
const { User } = require("../models");
const dotenv = require("dotenv").config();
const bcrypt = require("bcryptjs");
const { validationResult, check } = require("express-validator");
const jwt = require("jsonwebtoken");

const route = router.post(
  "/login",
  check("password").not().isEmpty().withMessage("Write password"),
  async (req, res) => {
    const errors = validationResult(req);
    const TOKEN_SECRET = process.env.TOKEN_SECRET;
    if (!errors.isEmpty) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }
    const user = await User.findOne({ where: { email: req.body.email } });

    try {
      if (!user) throw new Error("Email does now exists");

      try {
        if (!bcrypt.compare(req.body.password, user.password))
          throw new Error("Password is wrong");
        //console.log(user);
        const accsessToken = generateAccsessToken(user);
        const refreshToken = jwt.sign(user, "secret");

        res.json({ accsessToken: accsessToken, refreshToken: refreshToken });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }

    function generateAccsessToken(user) {
      return jwt.sign(user, "secret", { expiresIn: "15" });
    }
  }
);

module.exports = route;
