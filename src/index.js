const dotenv = require("dotenv");
const connectToDatabase = require("./database/index");

dotenv.config();

connectToDatabase();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require("./app/controller/index")(app);

app.listen(8080);
