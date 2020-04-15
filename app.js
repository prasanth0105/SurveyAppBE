
/* eslint-disable no-console */
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./app/controllers/survey.controller");
const errorHandler = require("./app/middlewares/errorHandler");

const app = express();
mongoose.connect('mongodb://localhost/RoleMngmt');
mongoose.Promise=global.Promise;

require("dotenv").config();
require("./app/services/mongo.service");


app.use(cors());
app.use(bodyParser.json());
app.use(routes);
app.use((err, req, res, next) => errorHandler(err, res, next));

app.on( "ready", () => {
  app.listen(process.env.PORT, () => {
    console.log("Listening for Requests");
  });
});
mongoose.connection.once("open", () => {
  app.emit("ready");
});
