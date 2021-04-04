const express = require("express");
const Router = express.Router();
const { Task } = require("../models");

const get = Router.get("/", async (req, res) => {
  let filter = {};
  let sort = [];
  if (req.query.filterBy) filter = { done: req.query.filterBy };
  if (req.query.sort) sort = ["createdAt", req.query.sort];
  const tasks = await Task.findAndCountAll({
    where: filter.done,
    order: sort,
    limit: 5,
    offset: (req.query.page - 1) * 5,
  });

  res.send(tasks);
});

module.exports = get;
