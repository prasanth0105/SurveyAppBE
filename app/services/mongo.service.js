/* eslint-disable no-console */
require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGO_URL,
  {useNewUrlParser: true, useUnifiedTopology: true},
  (err) => {
    if (err) {
      err.message = "Database Connection Failed!";
      console.log(err.message);
      process.exit(1);
    } else {
      console.log("Connected to DATABASE");
    }
  }
);

