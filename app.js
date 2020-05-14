/* eslint-disable no-console */
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const def = require("./app/controllers/default-group.controller");
const roles = require("./app/controllers/role.controller");
const users = require("./app/controllers/user.controller");
const routes = require("./app/controllers/survey.controller");
const errorHandler = require("./app/middlewares/errorHandlers/errorHandler");


const app = express();
require("dotenv").config();
require("./app/services/mongo.service");


app.use(cors());
app.use(bodyParser.json());
app.use(def, users, roles, routes);

app.use((err, _req, res, next) => errorHandler(err, res, next));


app.on("ready", () => {
  app.listen(process.env.PORT, () => {
    console.log("Listening for Requests");
  });
});
mongoose.connection.once("open", () => {
  app.emit("ready");
});
