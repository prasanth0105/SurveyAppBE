const mongoose= require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser= require('body-parser');
const routes= require('./app/controllers/survey.controller');
const app = express();
mongoose.connect('mongodb://localhost:27017/surveyApp', { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log("ERROR : 500 Can't connect to DATABASE right now");
    } else {
      console.log('Connected to DATABASE');
    }
  });
mongoose.Promise = global.Promise;

app.use(cors());
app.use(bodyParser.json());
app.use(routes);
app.use(function(err,res){
    console.log("ERROR!"+res);
    res.status(422).send({error: err.message });
});


app.listen(8080, () => {
  console.log('Listening for Requests');
});
