const express= require('express');
const router=express.Router();

var Survey = require("../models/db.survey.model");
var Question = require("../models/db.questions.answers.model");
var Answer = require("../models/db.answers.model");

router.get("/surveys", function(req,res,next) {
    Survey.find({})
    .then(function(dbSurvey) {
      res.json(dbSurvey);
    })
    .catch();
});

router.post("/surveys", function(req, res) {
    Survey.create(req.body)
    .then(function(dbSurvey) {
    res.json(dbSurvey);
    })
    .catch();
});

router.post("/surveys/:surId", function(req, res) {
    Question.create(req.body)
      .then(function(dbQuestion) {
        return Survey.findOneAndUpdate({ _id: req.params.surId }, {$push: {question_set: dbQuestion._id}}, { new: true });
      })
      .then(function(dbSurvey) {
        res.json(dbSurvey);
      })
      .catch();
});

router.post("/surveys/:surId/:qId", function(req, res) {
    Answer.create(req.body)
      .then(function(dbAnswer) {
        return Question.findOneAndUpdate({ _id: req.params.qId }, {$push: {answers: dbAnswer._id}}, { new: true });
      })
      .then(function(dbQuest) {
        res.json(dbQuest);
      })
      .catch();
});

router.get("/surveys/:surId", function(req, res) {
    Survey.find({ _id: req.params.surId })
      .populate({
        path: 'question_set',
        select: ['answers','question'],
        populate: [{
          path: 'answers',
          select:['option_type','option_label']
        }]
      })
      .then(function(dbSurvey) {
        res.json(dbSurvey);
      })
      .catch();
});


module.exports=router;