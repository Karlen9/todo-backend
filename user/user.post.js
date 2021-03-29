const express = require('express');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
const { body, validationResult, check } = require('express-validator');
const fs = require('fs');
const { json } = require('body-parser');
const dataFile = './data.json';
const Router = express.Router();


const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const post = Router.post('/', 
  check('name')
  .isLength({min: 2})
  .withMessage('Must be at least 2 char long'),
  body('done').isBoolean(), 
  body('name').isString().trim(),
  (req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    console.log(errors.array()[0].msg);
    return res.status(400).json({ errors: errors.array()[0].msg });

  } else {
    let items = fs.readFileSync(dataFile, 'utf-8');
    const item = {
      name: req.body.name,
      id: uuidv4(),
      done: Boolean(req.body.done),
      createdAt: Date().toLocaleString()
    }
    console.log(items);

    const parsedItems = JSON.parse(items);
    parsedItems.push(item);
    const data = JSON.stringify(parsedItems);

    fs.writeFileSync(dataFile, data);
    res.send(data);
    
  }

});


module.exports = post;