const express = require('express');
const Router = express.Router()


const get = Router.get('/tasks', (req, res) => {
    res.send(tasks.name);
  })

module.exports = get;
