const express = require("express");
const Router = express.Router();
const { Item } = require("../models");

const deleteTask = Router.delete("/delete/:id", async (req, res) => {
  const deletingTask = await Item.destroy({ where: { id: req.params.id } });

  res.send("Task has deleted");
});

module.exports = deleteTask;
