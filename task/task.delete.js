const express = require('express');
const Router = express.Router();
const Task = require('../models');


const deleteTask = Router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findOne({where: {id: req.params.id}});
    if(!task) throw new Error('Task does not exist');

    const deletingTask = await Task.destroy({where: {id: req.params.id}}); 
  
  res.send(deletingTask);
  } catch (error) {
    res.status(400).json(error.message);
  }
  
});

module.exports = deleteTask;