const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/task', require('./user/user.post'))
app.use('/task', require('./user/user.delete'))
app.use('/tasks', require('./user/user.get'))
app.use('/task', require('./user/user.patch'))

app.listen(process.env.PORT || 3000, () => {
  console.log('start');
});

