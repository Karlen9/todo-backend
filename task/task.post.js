const express = require("express");
const { body, validationResult, check } = require("express-validator");
const { Item } = require("../models");
const Router = express.Router();
const authorizationCheck = require("../authorizationCheck");
const jwt = require("jsonwebtoken");
const validation = require("../validation");
const getTokenId = require("../getTokenId");

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
    //validation(req, res);

    try {
      validation(req, res);

      const item = await Item.findOne({ where: { name: req.body.name } });
      if (item) {
        throw new Error("Task name is already in use");
      }

      const task = await Item.create({
        name: req.body.name.trim(),
        done: req.body.done,
        userId: getTokenId(req),
      });
      res.send(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = route;
