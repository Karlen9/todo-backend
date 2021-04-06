const express = require("express");
const Router = express.Router();
const { Item } = require("../models");

const get = Router.get("/", async (req, res) => {
  let sort = [];
  let filter = {};
  const fiveElOffset = (req.query.page - 1) * 5;
  const amountOfElementsOnPage = 5;

  if (req.query.sort) sort = ["createdAt", req.query.sort];

  if (req.query.filterBy) filter = { done: req.query.filterBy };

  const tasks = await Item.findAndCountAll({
    where: filter,
    order: [sort],
    limit: amountOfElementsOnPage,
    offset: fiveElOffset,
  });

  res.send(tasks);
});

module.exports = get;
