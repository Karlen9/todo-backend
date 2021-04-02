
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
  
  //let tasks = fs.readFileSync(dataFile, 'utf-8');
  //const parsedTasks = JSON.parse(tasks);
  
  //const newTasks = [...DBtasks.rows];

  // switch(req.query.sort) {
  //   case 'asc': 
  //     newTasks = newTasks;
  //     break;
  //   case 'desc':
  //     newTasks = tasks.reverse(); 
  //     break; 
  // } 
   
  // switch(req.query.filterBy) {
  //   case 'all':
  //     newTasks = tasks;
  //     break;
  //   case 'done':
  //     newTasks = tasks.filter(e => e.done === true);
  //     break; 
  //   case 'undone':
  //     newTasks = tasks.filter(e => e.done === false)
  //   default: 
  //     break; 
  // }


  res.send(tasks);
})

module.exports = get;
