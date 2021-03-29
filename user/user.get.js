
const express = require('express');
const Router = express.Router();
const fs = require('fs');
const dataFile = './data.json';


const get = Router.get('/', (req, res) => {
  let tasks = fs.readFileSync(dataFile, 'utf-8');
  const parsedTasks = JSON.parse(tasks);
  let newTasks = [];

  switch(req.query.sort) {
    case 'asc': 
      newTasks = parsedTasks;
      break;
    case 'desc':
      newTasks = parsedTasks.reverse();
      break;
    default: newTasks = parsedTasks; 
      break;
  }
   
  switch(req.query.filterBy) {
    case 'done':
      newTasks = parsedTasks.filter(e => e.done === true);
      break;
    case 'undone':
      newTasks = parsedTasks.filter(e => e.done === false)
    default: 
      break; 
  }


  res.send(newTasks);
})

module.exports = get;
