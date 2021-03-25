const express = require('express');
const dotenv = require('dotenv');

const app = express();

const array = [
  {
    id: 1,
    name: 'name1'
  },
  {
    id:2,
    name: 'name2'
  },
  {
    id:3,
    name: 'name3'
  }
];

app.get('/', (req, res) => {
  res.send('Hello API');
});

app.get('/array', (req, res) => {
  res.send(array);
});

app.get('/array/:id', (req, res) => {
  const arr = array.find((arr) => {
    return arr.id === Number(req.params.id);
  });
  res.send(arr);
})

app.listen(3000, () => {
  console.log('start');
});