const express = require("express");
const authorizationCheck = require("../authorizationCheck");
const Router = express.Router();
const { Item } = require("../models");
const jwt = require("jsonwebtoken");

const route = Router.get("/get", authorizationCheck, async (req, res) => {
  const token = req.header("auth-token");
  const id = jwt.decode(token).id;

  let sort = ["createdAt", "asc"];
  const filter = {};
  filter.userId = id;
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
  res.send(tasks);
});

module.exports = route;
