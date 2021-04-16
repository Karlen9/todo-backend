const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

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

const klawSync = require("klaw-sync");
async function useControllers() {
  const paths = klawSync("./controllers", { nodir: true });
  let controllersCount = 0;
  paths.forEach((file) => {
    if (
      path.basename(file.path)[0] === "_" ||
      path.basename(file.path)[0] === "."
    )
      return;
    app.use("/", require(file.path));
    controllersCount++;
  });

  console.info(`Total controllers: ${controllersCount}`);
}

useControllers();
