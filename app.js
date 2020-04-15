const express = require('express');
const cors = require('cors');
const bodyParser= require('body-parser');
const mongoose= require('mongoose');
const routes= require('./app/controllers/role.controller');

const app = express();
mongoose.connect('mongodb://localhost/RoleMngmt');
mongoose.Promise=global.Promise;

app.use(cors());
app.use(bodyParser.json());
app.use(routes);
app.use(function(err,req,res,next){
    console.log("ERROR!"+err.message);
    res.status(422).send({error: err.message });
});


app.listen(4000, (req,res,next) => {
  console.log('Listening for Requests');
});
