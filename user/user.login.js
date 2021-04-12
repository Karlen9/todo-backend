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
    if (!errors.isEmpty)
      return res.status(400).json({ errors: errors.array()[0].msg });
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) throw Error("Email or password is wrong");

    try {
      if (!bcrypt.compare(req.body.password, user.password))
        throw new Error("Email or password is wrong");
      // if (!validPassword) {
      //   res.send("Email or password is wrong");

      //   throw new Error("Email or password is wrong");
      // }
      console.log(user);
      const token = jwt.sign({ id: user.id }, "secret", { expiresIn: 400 });
      res.header("auth-token", token).send(token);
    } catch (error) {
      //res.status(400).json({ error: error.message });
    }
  }
);

module.exports = route;
