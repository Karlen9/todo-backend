const express = require("express");
const Router = express.Router();
const { Item } = require("../models");

const verify = require("../verifyToken");

const route = Router.get("/get", verify, async (req, res) => {
  let sort = ["createdAt", "asc"];
  const filter = {};
  const fiveElOffset = (req.query.page - 1) * 5;
  const amountOfElementsOnPage = 5;

  if (req.query.order) sort = ["createdAt", req.query.order];

  if (req.query.filterBy) filter.done = req.query.filterBy;

  const tasks = await Item.findAndCountAll({
    where: filter,
    order: [sort],
    limit: amountOfElementsOnPage,
    offset: fiveElOffset,
  });
  console.log(fiveElOffset);
  res.send(tasks);
});

module.exports = route;
