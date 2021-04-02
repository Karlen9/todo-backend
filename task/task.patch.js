const express = require('express');
const Router = express.Router();
const { body, validationResult } = require('express-validator');
const { Task } = require('../models');

const patch = Router.patch('/:id',
    body('name').optional().isString(),
    body('done').optional().isBoolean(), 
    async (req, res) => {
    const errors = validationResult(req);

    console.log(req.body);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });
    } 

    const task = await Task.update({ 
        name: req.body.name,
        done: req.body.done
    }, {
        where: { id: req.params.id },
        returning: true,
        plain: true
    });

    res.send(task); 

});


module.exports = patch;