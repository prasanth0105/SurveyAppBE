const Joi = require("@hapi/joi");
module.exports.registerInfo = Joi.object().keys({
  username: Joi.string().alphanum().min(5).max(30).required(),
  email: Joi.string().min(5).max(30).required(),
  password: Joi.string().alphanum().min(5).max(30).required(),
  confirmPassword: Joi.string().alphanum().min(5).max(30).required()
});
module.exports.loginInfo = Joi.object().keys({
  email: Joi.string().min(5).max(30).required(),
  password: Joi.string().alphanum().min(5).max(30).required()
});

