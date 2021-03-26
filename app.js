const express = require('express');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
const { body, validationResult, check } = require('express-validator');
const fs = require('fs');

const app = express();
let tasks = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/tasks', 
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
    const item = {
      name: req.body.name,
      id: uuidv4(),
      done: Boolean(req.body.done),
      createdAt: Date().toLocaleString()
    }
    const data = JSON.stringify(item);
    fs.writeFileSync('data.json', data);
    res.send(data);
  }

});

app.delete('/:id', (req, res) => {
  tasks = tasks.filter(e => e.id !== req.params.id);

  res.send(tasks);
})


app.get('/tasks', (req, res) => {
  res.send(tasks.name);
})

app.listen(3000, () => {
  console.log('start');
});