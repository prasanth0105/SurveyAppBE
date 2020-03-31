const Joi = require("@hapi/joi");

module.exports.addSurvey = Joi.object().keys({
  survey_owner: Joi.string().alphanum().min(3).max(18).required(),
  survey_name: Joi.string().alphanum().min(3).max(18).required()
});
module.exports.addQuestion = Joi.object().keys({
  question: Joi.string().required(),
  survey_id: Joi.string().min(24).required()
});
module.exports.addAnswer = Joi.object().keys({
  option_type: Joi.string().alphanum().required(),
  option_label: Joi.string().alphanum().required(),
  survey_id: Joi.string().min(24).required(),
  question_id: Joi.string().min(24).required()
});
module.exports.Validator = (schema) => (req, res, next) => {
  const valResult = schema.validate(req.body);
  if (valResult.error) {
    valResult.error.code = 400;
    next(valResult.error);
  }
  next();
};
