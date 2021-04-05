const express = require("express");
const Router = express.Router();
const Item = require("../models/Item");

const deleteTask = Router.delete("/:id", async (req, res) => {
  const deletingTask = await Item.destroy({ where: { id: req.params.id } });

  res.send(deletingTask);
});

module.exports = deleteTask;
