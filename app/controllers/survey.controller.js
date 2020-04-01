const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();
const Survey = require("../models/db.survey.model");
const Question = require("../models/db.questions.model");
const Answer = require("../models/db.answers.model");

const joi = require("../middlewares/joi");

const viewSurveys = async (_req, res, next) => {
  try {
    res.json(await Survey.find({}));
  } catch (err) {
    next(err);
  }
};

const newSurvey = async (req, res, next) => {
  try {
    res.json(await Survey.create(req.body));
  } catch (err) {
    next(err);
  }
};

const newQuestion = async (req, res, next) => {
  try {
    const dbQuestion = await Question.create(req.body);
    const surveyUpdate = await Survey.findOneAndUpdate(
      {_id: req.params.surId},
      {$push: {question_set: dbQuestion._id}},
      {new: true}
    );
    res.json(surveyUpdate);
  } catch (err) {
    next(err);
  }
};

const newAnswer = async (req, res, next) => {
  try {
    const dbAnswer = await Answer.create(req.body);
    const questionUpdate = await Question.findOneAndUpdate(
      {_id: req.params.qId},
      {$push: {answers: dbAnswer._id}},
      {new: true}
    );
    return res.json(questionUpdate);
  } catch (err) {
    next(err);
  }
};

const viewSurvey = async (req, res, next) => {
  try {
    res.json(
      await Survey.find({_id: req.params.surId}).populate({
        path: "question_set",
        select: ["answers", "question"],
        populate: [
          {
            path: "answers",
            select: ["option_type", "option_label"]
          }
        ]
      })
    );
  } catch (err) {
    next(err);
  }
};

router.get("/surveys", (req, res, next) => viewSurveys(req, res, next));

router.post("/surveys", joi.validator(joi.addSurvey), (req, res, next) =>
  newSurvey(req, res, next)
);

router.post(
  "/surveys/:surId",
  joi.validator(joi.addQuestion),
  (req, res, next) => newQuestion(req, res, next)
);

router.post(
  "/surveys/:surId/:qId",
  joi.validator(joi.addAnswer),
  (req, res, next) => newAnswer(req, res, next)
);

router.get("/survey/:surId", (req, res, next) => viewSurvey(req, res, next));

module.exports = router;
