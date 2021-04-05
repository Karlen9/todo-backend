const express = require("express");
const Router = express.Router();
const { Item } = require("../models");

const get = Router.get("/", async (req, res) => {
  let filter = {};
  let sort = [];
  if (req.query.filterBy) filter = { done: req.query.filterBy };

  // if (req.query.filterBy) {
  //   if (req.body.filterBy === "all") {
  //     filter = {};
  //   } else if (req.body.filterBy === "done") {
  //     filter = { done: true };
  //   } else if (req.body.filterBy === "undone") {
  //     filter = { done: false };
  //   }
  // }
  if (req.query.sort) sort = ["createdAt", req.query.sort];
  const tasks = await Item.findAndCountAll({
    where: filter,
    order: sort,
    limit: 5,
    offset: (req.query.page - 1) * 5,
  });

  res.send(tasks);
});

module.exports = get;
