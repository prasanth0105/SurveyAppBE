const Joi = require("@hapi/joi");

module.exports.signIn = Joi.object().keys({
  emailId: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  password: Joi.string().allow("").allow(null)
});

module.exports.signUp = Joi.object().keys({
  adminsName: Joi.string().alphanum().min(3).max(30).required(),
  emailId: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  password: Joi.string().allow("").allow(null),
  confirm_password: Joi.string().allow("").allow(null)
}).with("password", "confirm_password");

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
module.exports.registerInfo = Joi.object().keys({
  username: Joi.string().alphanum().min(5).max(30).required(),
  email: Joi.required(),
  password: Joi.string().alphanum().min(5).max(30).required(),
  confirmPassword: Joi.string().alphanum().min(5).max(30).required(),
})
module.exports.loginInfo = Joi.object().keys({
  email: Joi.required(),
  password: Joi.string().alphanum().min(5).max(30).required(),
})
