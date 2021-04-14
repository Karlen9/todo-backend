const express = require("express");
const Router = express.Router();
const { Item } = require("../models");
const authorizationCheck = require("../authorizationCheck");

const deleteTask = Router.delete(
  "/delete",
  authorizationCheck,
  async (req, res) => {
    const deletingTask = await Item.destroy({
      where: { id: req.query.id },
    });

    res.send("Task has deleted");
  }
);

module.exports = deleteTask;
