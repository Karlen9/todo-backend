const express = require('express');
const Router = express.Router();
const fs = require('fs');
const Task = require('../models');


const deleteTask = Router.delete('/:id', async (req, res) => {
  

  const task = await Task.findOne({where: {id: req.params.id}});
  if(task) {
  const deletingTask = await Task.destroy({where: {id: req.params.id}}); 

  }
  res.send(deletingTask);
})

module.exports = deleteTask;