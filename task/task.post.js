const express = require('express');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');
const { body, validationResult, check } = require('express-validator');
const fs = require('fs');
const { Task } = require('../models');
const Router = express.Router();

const post = Router.post('/', 
  body('done').optional(),     
  body('name').optional().isString(),
  check('name')
  .isLength({min: 2, max: 30})
  .withMessage('Must be at least 2 char long'),
  async (req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    console.log(errors.array()[0].msg);
    return res.status(400).json({ errors: errors.array()[0].msg });

  } else {
    try {

      const task = await Task.create({
        name: req.body.name,
        id: uuidv4(),
        done: req.body.done
      })
      res.send(task);  
    } catch (error) {
      console.log(error);
    }
  }
});

module.exports = post;