const express = require("express");
const Router = express.Router();
const { body, check } = require("express-validator");
const { Item } = require("../models");
const authorizationCheck = require("../authorizationCheck");
const validation = require("../validation");

const route = Router.patch(
  "/patch",
  authorizationCheck,
  body("name").optional().isString(),
  body("done").optional().isBoolean(),
  check("name")
    .isAscii()
    .trim()
    .withMessage("Task must contains alphabets or numbers")
    .isLength({ min: 2, max: 30 })
    .withMessage("Must be at least 2 char long"),
  async (req, res) => {
    try {
      validation(req, res);

      // if (req.body.name) {
      //   const existingTask = await Item.findOne({
      //     where: { name: req.body.name },
      //   });

      //   if (existingTask) {
      //     throw new Error("Task name already in use");
      //   }
      // }

      const task = await Item.update(
        {
          name: req.body.name,
          done: req.body.done,
        },
        {
          where: { id: req.query.id },
          returning: true,
          plain: true,
        }
      );

      res.send(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = route;
