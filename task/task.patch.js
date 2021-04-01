const fs = require('fs');
const express = require('express');
const Router = express.Router();
const { body, validationResult } = require('express-validator');

const patch = Router.patch('/:id',

    body('name').optional().isString(),
    //Typo edit
    body('done').optional().isBoolean(), 
    (req, res) => {     
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });
        
    } else {
    let newTasks = fs.readFileSync(dataFile, 'utf-8');
    const todos = JSON.parse(newTasks);
    const item = todos.some(e => e.id === req.params.id);
    const todo = todos.find(todo => todo.id === req.params.id);
    console.log(todo);

    if(!item) return res.status(404).send('Item not found');

    const editingItem = todos.find(e => e.id === req.params.id);
    editingItem.name = req.body.name ? req.body.name : todo.name;
    editingItem.done = req.body.done ? req.body.done : todo.done;

    const stringifiedTasks = JSON.stringify(todos)
    fs.writeFileSync(dataFile, stringifiedTasks);

    res.send(editingItem); 

    }
});


module.exports = patch;