const express = require("express");
const Router = express.Router();
const { Item } = require("../models");

const deleteTask = Router.delete("/:id", async (req, res) => {
  const deletingTask = await Item.destroy({ where: { id: req.params.id } });

  res.send("aeafef");
});

module.exports = deleteTask;
