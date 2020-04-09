const Joi = require("@hapi/joi");

module.exports.addSurvey = Joi.object().keys({
  survey_owner: Joi.string().min(3).max(18).required(),
  survey_name: Joi.string().min(3).max(18).required(),
  survey_description: Joi.string(),
  survey_published: Joi.boolean(),
  invited: Joi.number(),
  attended: Joi.number()
});
module.exports.addQuestion = Joi.object().keys({
  question: Joi.string().required(),
  question_type: Joi.string().required()
});
module.exports.addOption = Joi.object().keys({
  option_label: Joi.string().required()
});
module.exports.validator = (schema) => (req, res, next) => {
  const valResult = schema.validate(req.body);
  if (valResult.error) {
    valResult.error.code = 400;
    next(valResult.error);
  }
  next();
};
