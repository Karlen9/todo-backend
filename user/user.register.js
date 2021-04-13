const router = require("express").Router();
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const { body, validationResult, check } = require("express-validator");

//JWT
//Local config.js
//Interceptors
//Refactoring

const route = router.post(
  "/register",
  body("firstName").isString(),
  check("email").trim().isEmail().withMessage("Please, write valid email"),
  check("firstName")
    .trim()
    .isLength({ min: 4, max: 50 })
    .withMessage("First name must be at least 4 char long"),
  check("lastName")
    .trim()
    .isLength({ min: 4, max: 50 })
    .withMessage("Last name must be at least 4 char long"),
  check("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 char long"),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }

    try {
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
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
      });

      console.log(user);

      res.send(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = route;
