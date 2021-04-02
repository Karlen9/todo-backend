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
