const router = require("express").Router();
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const { body, validationResult, check } = require("express-validator");

const route = router.post(
  "/register",
  body("firstName").isString(),
  check("firstName")
    .trim()
    .isLength({ min: 4, max: 50 })
    .withMessage("First name must be at least 4 char long"),
  check("lastName")
    .trim()
    .isLength({ min: 4, max: 50 })
    .withMessage("First name must be at least 4 char long"),
  check("email").trim().isEmail().withMessage("Please, write valid email"),
  check("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password mute be at least 6 char long"),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }

    try {
      const existEmail = User.findOne({ where: { email: req.body.email } });
      if (existEmail) {
        throw new Error("Email is already in use");
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const user = new User({
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
      });
      try {
        const savedUser = await user.save();
        res.send(savedUser);
      } catch (error) {
        //res.status(400).json({ error: error.message });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
    //HASHING THE PASSWORD
  }
);

module.exports = route;
