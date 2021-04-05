const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { body, validationResult, check } = require("express-validator");
const { Item } = require("../models");
const Router = express.Router();

const post = Router.post(
  "/",
  body("done").optional(),
  body("name").optional().isString(),
  check("name")
    .isLength({ min: 2, max: 30 })
    .withMessage("Must be at least 2 char long"),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors.array()[0].msg);
      return res.status(400).json({ errors: errors.array()[0].msg });
    }
    try {
      const item = await Item.findOne({ where: { name: req.body.name } });
      if (item) {
        throw new Error("Task is already in use");
      }

      const task = await Item.create({
        name: req.body.name,
        done: req.body.done,
      });
      res.send(task);
    } catch (error) {
      res.status(400).json(error.message);
      console.log(error);
    }
  }
);

module.exports = post;
