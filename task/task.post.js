const express = require("express");
const { body, validationResult, check } = require("express-validator");
const { Item } = require("../models");
const Router = express.Router();
const authorizationCheck = require("../authorizationCheck");
const jwt = require("jsonwebtoken");

const route = Router.post(
  "/post",
  authorizationCheck,
  body("done").optional(),
  body("name").optional().isString(),
  check("name")
    .isAscii()
    .trim()
    .withMessage("Task must contains alphabets or numbers")
    .isLength({ min: 2, max: 30 })
    .withMessage("Must be at least 2 char long"),
  async (req, res) => {
    const errors = validationResult(req);

    const token = req.header("auth-token");
    const id = jwt.decode(token).id;

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }
    try {
      const item = await Item.findOne({ where: { name: req.body.name } });
      if (item) {
        throw new Error("Task name is already in use");
      }

      const task = await Item.create({
        name: req.body.name.trim(),
        done: req.body.done,
        userId: id,
      });
      res.send(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = route;
