const mongoose= require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser= require('body-parser');
const routes= require('./app/controllers/survey.controller');
const errorHandler = require('./app/middlewares/errorHandler');
const app = express();
mongoose.connect('mongodb://localhost:27017/surveyApp', { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log('ERROR : 500 Cant connect to DATABASE right now');
    } else {
      console.log('Connected to DATABASE');
    }
  });
mongoose.Promise = global.Promise;

app.use(cors());
app.use(bodyParser.json());
app.use(routes);
app.use((err, req, res, next) => errorHandler(err, res, next));

app.listen(8080, () => {
  console.log('Listening for Requests');
});
