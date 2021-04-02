
const express = require('express');
const Router = express.Router();
const fs = require('fs');
const { Task } = require('../models');

const get = Router.get('/', async (req, res) => {
  let filter = {};
  let sort = [];
  if(req.query.filterBy) filter = {done: req.query.filterBy}
  if(req.query.sort) sort = ['createdAt', req.query.sort]

  const tasks = await Task.findAll({ where: filter, order: sort })

  res.send(tasks);
})

module.exports = get;
