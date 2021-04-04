<<<<<<< HEAD
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const fs = require('fs');
const { fileURLToPath } = require('url');
const filePath = './data.json'
const cors = require('cors');

const app = express();
const initialFileArray = JSON.stringify([]);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use('/task', require('./user/user.post'));
app.use('/task', require('./user/user.delete'));
app.use('/tasks', require('./user/user.get'));
app.use('/task', require('./user/user.patch'));

if (fs.existsSync(filePath)){
  console.log('Path exists');
} else {
  fs.open(filePath, 'w', (error) => {
    console.log(error);
  });
  fs.writeFileSync(filePath, initialFileArray);

}



app.listen(process.env.PORT || 3000, () => {
  console.log('start');
});

=======
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const fs = require("fs");
const { fileURLToPath } = require("url");
const cors = require("cors");

const app = express();
//const initialFileArray = JSON.stringify([]);

const db = require("./models");
const { sequelize } = require("./models");

app.listen(process.env.PORT || 3000, () => {
  console.log("start");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/task", require("./task/task.post"));
app.use("/task", require("./task/task.delete"));
app.use("/tasks", require("./task/task.get"));
app.use("/task", require("./task/task.patch"));

// if (fs.existsSync(filePath)){
//   console.log('Path exists');
// } else {
//   fs.open(filePath, 'w', (error) => {
//     console.log(error);
//   });
//   fs.writeFileSync(filePath, initialFileArray);

// }
>>>>>>> database
