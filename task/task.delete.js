const express = require("express");
const Router = express.Router();
const { Item } = require("../models");
const authorizationCheck = require("../authorizationCheck");
const jwt = require("jsonwebtoken");

const deleteTask = Router.delete(
  "/delete",
  authorizationCheck,
  async (req, res) => {
    const token = req.header("auth-token");
    const id = jwt.decode(token).id;

    const deletingTask = await Item.destroy({
      where: { id: req.query.id, userId: id },
    });

    res.send("Task has deleted");
  }
);

module.exports = deleteTask;
