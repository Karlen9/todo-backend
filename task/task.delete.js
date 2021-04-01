const express = require('express');
const Router = express.Router();
const fs = require('fs');



const deleteTask = Router.delete('/:id', (req, res) => {
  //let tasks = fs.readFileSync(dataFile, 'utf-8');
  //const parsedTasks = JSON.parse(tasks);
  //console.log(tasks);
  
  const deletingItem = parsedTasks.some(e => e.id === req.params.id);

  if(!deletingItem) return res.status(404).send('Item not found');
  
  //const newTasks = parsedTasks.filter(e => e.id !== req.params.id);
  const stringifiedTasks = JSON.stringify(newTasks);
  //fs.writeFileSync(dataFile, stringifiedTasks);
  res.send(stringifiedTasks);
})

module.exports = deleteTask;