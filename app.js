/* eslint-disable no-console */
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./app/controllers/role.controller");
const errorHandler = require("./app/middlewares/errorHandlers/errorHandler");

const app = express();
require("dotenv").config();
require("./app/services/mongo.service");

app.use(cors());
app.use(bodyParser.json());
app.use(routes);
app.use((err, _req, res, next) => errorHandler(err, res, next));

app.on( "ready", () => {
  app.listen(process.env.PORT, () => {
    console.log("Listening for Requests");
  });
});
mongoose.connection.once("open", () => {
  app.emit("ready");
});
