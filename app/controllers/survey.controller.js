/* eslint-disable new-cap */
const express = require("express");

const router = express.Router();
const Survey = require("../models/db.Survey.model");
const Question = require("../models/db.Survey.Question.model");
const Option = require("../models/db.Question.Option.model");
const SurveyInvitationDetails = require("../models/db.Survey.InvitationDetails.model");
const joi = require("../middlewares/validators/joi");
const validateToken= require("../middlewares/validators/tokenvalidator").validateToken;

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

const viewSurvey = async (req, res, next) => {
  try {
    const _surveyDetails = await Survey.find({_id: req.params.surId});
    const _questionDetails = await Question.find({survey_id: req.params.surId});
    const _questions = [];
    for (let i = 0; i < _questionDetails.length; i++) {
      const options = await Option.find({question_id: _questionDetails[i]._id});
      _questions[i] = {
        Question: _questionDetails[i],
        Options: []
      };
      for (let j = 0; j < options.length; j++) {
        _questions[i]["Options"][j] = options[j];
      }
    }
    res.send({
      surveyDetails: _surveyDetails,
      questionOptions: _questions
    });
  } catch (err) {
    next(err);
  }
};

const newInvitation = async (req, res, next) => {
  try {
    res.json(await SurveyInvitationDetails.create(req.body));
  } catch (err) {
    next(err);
  }
};

const getInvitationInfo = async (req, res, next) => {
  try {
    const details = await SurveyInvitationDetails.find({survey_id: req.params.surId});
    for (let i=0; i<details.length; i++) {
      for (let j= 0; j<details.length; j++) {
        if (details[i].user_id === details[j].user_id && details[i].invited_at < details[j].invited_at) {
          details.splice(i, 1);
        } else if (details[i].user_id === details[j].user_id && details[i].invited_at > details[j].invited_at) {
          details.splice(j, 1);
        }
      }
    }
    res.json(details);
  } catch (err) {
    next(err);
  }
};
const editSurvey = async (req, res, next) => {
  try {
    res.json( await Survey.findOneAndUpdate({_id: req.params.surId}, req.body));
  } catch (err) {
    next(err);
  }
};
const newQuestion = async (req, res, next) => {
  try {
    res.json( await Question.create(req.body));
  } catch (err) {
    next(err);
  }
};

const editQuestion = async (req, res, next) => {
  try {
    res.json( await Question.findOneAndUpdate({_id: req.params.qId}, req.body));
  } catch (err) {
    next(err);
  }
};

const deleteQuestion = async (req, res, next) => {
  try {
    res.json( await Question.findByIdAndRemove({_id: req.params.qId}));
  } catch (err) {
    next(err);
  }
};

const newOption = async (req, res, next) => {
  try {
    res.json(await Option.create(req.body));
  } catch (err) {
    next(err);
  }
};
const viewOption = async (req, res, next) => {
  try {
    res.json(await Option.findOne({_id: req.params.optId}));
  } catch (err) {
    next(err);
  }
};
const editOption = async (req, res, next) => {
  try {
    res.json( await Option.findOneAndUpdate({_id: req.params.optId}, req.body));
  } catch (err) {
    next(err);
  }
};

const deleteOption = async (req, res, next) => {
  try {
    res.json( await Option.findByIdAndRemove({_id: req.params.optId}));
  } catch (err) {
    next(err);
  }
};


router.get("/surveys", (req, res, next) => viewSurveys(req, res, next));

router.post("/new-survey", (req, res, next) => newSurvey(req, res, next));

router.get("/view-survey/:surId", (req, res, next) => viewSurvey(req, res, next));

router.put("/edit-survey/:surId", (req, res, next) => editSurvey(req, res, next));

router.post("/survey/to-invite", (req, res, next) => newInvitation(req, res, next));

router.get("/survey/view-invite/:surId", (req, res, next) => getInvitationInfo(req, res, next));

router.post("/survey/new-question", (req, res, next) => newQuestion(req, res, next));

router.put("/survey/edit-question/:qId", (req, res, next) => editQuestion(req, res, next));

router.delete("/survey/delete-question/:qId", (req, res, next) => deleteQuestion(req, res, next));

router.post("/survey/new-option", (req, res, next) => newOption(req, res, next));

router.get("/survey/view-option/:optId", (req, res, next) => viewOption(req, res, next));

router.put("/survey/edit-option/:optId", (req, res, next) => editOption(req, res, next));

router.delete("/survey/delete-option/:optId", (req, res, next) => deleteOption(req, res, next));


module.exports = router;
