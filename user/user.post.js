const express = require('express');
const dotenv = require('dotenv');
//uuid added
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
const { body, validationResult, check } = require('express-validator');
const fs = require('fs');
const { json } = require('body-parser');
const dataFile = './data.json';
const { Sequelize } = require('sequelize');
const {Task} = require('../models');
const Router = express.Router();


const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const post = Router.post('/', 
  body('done').optional(),     
  body('name').optional().isString(),
  check('name')
  .isLength({min: 2})
  .withMessage('Must be at least 2 char long'),
  async (req, res) => {
  const errors = validationResult(req);

  
  if(!errors.isEmpty()) {
    console.log(errors.array()[0].msg);
    return res.status(400).json({ errors: errors.array()[0].msg });

  } else {
    // let items = fs.readFileSync(dataFile, 'utf-8');

    try {

      const task = await Task.create({
        id: uuidv4(),
        name: req.body.name,
        done: req.body.done,
        date:Date().toLocaleString()
      })
      res.send(task);  
    } catch (error) {
      console.log(error);
    }
  }

});


module.exports = post;