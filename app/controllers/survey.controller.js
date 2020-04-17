/* eslint-disable new-cap */
const express = require("express");

const router = express.Router();
const Survey = require("../models/db.Survey.model");
const Question = require("../models/db.Survey.Question.model");
const Option = require("../models/db.Question.Option.model");
// const SurveyResponse = require("../models/db.Survey.Response.model");
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

const newQuestion = async (req, res, next) => {
  req.body.survey_id = req.params.surId;
  try {
    res.json( await Question.create(req.body));
  } catch (err) {
    next(err);
  }
};

const newOption = async (req, res, next) => {
  req.body.survey_id = req.params.surId;
  req.body.question_id = req.params.qId;
  try {
    res.json(await Option.create(req.body));
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
        Question: _questionDetails[i].question,
        Question_Type: _questionDetails[i].question_type,
        Options: []
      };
      for (let j = 0; j < options.length; j++) {
        _questions[i]["Options"][j] = options[j].option_label;
      }
    }
    res.send({
      surveyDetails: _surveyDetails,
      questionOptons: _questions
    });
  } catch (err) {
    next(err);
  }
};

const newInvitation = async (req, res, next) => {
  req.body.survey_id = req.params.surId;
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

// const viewSurveyResponses = async (_req, res, next) => {
//   try {
//     res.json(await SurveyResponse.find({survey_id: req.params.surId}));
//   } catch (err) {
//     next(err);
//   }
// };

// const viewSurveyResponse = async (_req, res, next) => {
//   try {
//     res.json(await SurveyResponse.find({survey_id: req.params.surId, user_id: req.params.uId}));
//   } catch (err) {
//     next(err);
//   }
// };

// const newSurveyResponse = async (req, res, next) => {
//   req.body.survey_id = req.params.surId;
//   req.body.user_id = req.params.uId;
//   try {
//     res.json(await SurveyResponse.create(req.body));
//   } catch (err) {
//     next(err);
//   }
// };

router.get("/surveys", validateToken, (req, res, next) => viewSurveys(req, res, next));

router.post("/survey", joi.validator(joi.addSurvey), validateToken, (req, res, next) => newSurvey(req, res, next));

router.post("/survey/invite/:surId", validateToken, (req, res, next) => newInvitation(req, res, next));

router.get("/survey/invite/:surId", validateToken, (req, res, next) => getInvitationInfo(req, res, next));

router.post("/survey/:surId", joi.validator(joi.addQuestion), validateToken, (req, res, next) => newQuestion(req, res, next));

router.post("/survey/:surId/:qId", joi.validator(joi.addOption), validateToken, (req, res, next) => newOption(req, res, next));

router.get("/survey/:surId", validateToken, (req, res, next) => viewSurvey(req, res, next));


// router.get("/survey_response/:surId", (req, res, next) => viewSurveyResponses(req, res, next));

// router.get("/survey_response/:surId/:uId", (req, res, next) => viewSurveyResponse(req, res, next));

// router.post("/survey_response/:surId/:uId", (req, res, next) => newSurveyResponse(req, res, next));

module.exports = router;
