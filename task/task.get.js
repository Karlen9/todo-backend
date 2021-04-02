
const express = require('express');
const Router = express.Router();
const fs = require('fs');
const { Task } = require('../models');

const get = Router.get('/', async (req, res) => {
  let filter = {};
  let sort = [];
  req.query.filterBy ? filter = {done: req.query.filterBy} : filter = {};
  req.query.sort ? sort = ['createdAt', req.query.sort] : sort = [];
  const tasks = await Task.findAll({ where: filter, order: sort })

  res.send(tasks);
})

module.exports = get;
