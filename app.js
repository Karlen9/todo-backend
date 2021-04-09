const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.listen(process.env.PORT || 3001, () => {
  console.log("start");
});

app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/task", require("./task/task.post"));
app.use("/task", require("./task/task.delete"));
app.use("/tasks", require("./task/task.get"));
app.use("/task", require("./task/task.patch"));
app.use("/user", require("./user/user.auth"));
app.use("/user", require("./user/user.login"));
