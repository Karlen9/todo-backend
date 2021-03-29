const fs = require('fs');
const express = require('express');
const Router = express.Router();
const dataFile = './data.json';
const { body, validationResult, check } = require('express-validator');
 

const patch = Router.patch('/:id',

    body('name').optional().isString().trim(),
    body('done').optional().isBoolean(), 
    (req, res) => {
    let newTasks = fs.readFileSync(dataFile, 'utf-8');
    const todo = JSON.parse(newTasks);
    const item = todo.some(e => e.id == req.params.id);
    
    if(!item) return res.status(404).send('Item not found');

    const editingItem = todo.find(e => e.id == req.params.id);
    editingItem.name = req.body.name;

    if(!item) return res.status(404).send('Item not exists');

    editingItem.done = req.body.done;

    const stringifiedTasks = JSON.stringify(todo)
    fs.writeFileSync(dataFile, stringifiedTasks);
  

    res.send(editingItem); 


});


module.exports = patch;