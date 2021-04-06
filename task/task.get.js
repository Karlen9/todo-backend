const express = require("express");
const Router = express.Router();
const { Item } = require("../models");

const get = Router.get("/", async (req, res) => {
  let sort = [];

  if (req.query.sort) sort = ["createdAt", req.query.sort];

  if (req.query.filterBy) {
    tasks = await Item.findAndCountAll({
      where: {
        done: req.query.filterBy,
      },
      order: [sort],
      limit: 5,
      offset: (req.query.page - 1) * 5,
    });
  } else if (!req.body.filterBy) {
    tasks = await Item.findAndCountAll({
      order: [sort],
      limit: 5,
      offset: (req.query.page - 1) * 5,
    });
  }

  res.send(tasks);
});

module.exports = get;
