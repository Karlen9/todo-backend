const router = require("express").Router();
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const { body, check } = require("express-validator");
const validation = require("../validation");

const route = router.post(
  "/register",
  body("name").isString(),
  check("email").trim().isEmail().withMessage("Please, write valid email"),
  check("name")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Name must be at least 1 char long"),
  check("password")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Password must be at least 1 char long"),
  async (req, res) => {
    try {
      validation(req, res);
      const existEmail = await User.findOne({
        where: { email: req.body.email },
      });
      if (existEmail) {
        throw new Error("Email is already in use");
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const user = await User.create({
        //id: req.body.id,
        name: req.body.firstName,
        email: req.body.email,
        password: hashedPassword,
      });

      res.send(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = route;
