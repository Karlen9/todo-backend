const express = require("express");
const Router = express.Router();
const { Item } = require("../models");

const get = Router.get("/", async (req, res) => {
  let sort = [];
  const fiveElOffset = (req.query.page - 1) * 5;
  const amountOfElementsOnPage = 5;

  if (req.query.sort) sort = ["createdAt", req.query.sort];

  let tasks = await Item.findAndCountAll();

  if (req.query.filterBy) {
    tasks = await Item.findAndCountAll({
      where: {
        done: req.query.filterBy,
      },
      order: [sort],
      limit: amountOfElementsOnPage,
      offset: fiveElOffset,
    });
  } else if (!req.body.filterBy) {
    tasks = await Item.findAndCountAll({
      order: [sort],
      limit: amountOfElementsOnPage,
      offset: fiveElOffset,
    });
  }

  res.send(tasks);
});

module.exports = get;
