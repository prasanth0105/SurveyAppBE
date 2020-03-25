const Joi = require('@hapi/joi');

module.exports.signIn = Joi.object().keys({
  emailId: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  password: Joi.string().allow('').allow(null),
});

module.exports.signUp = Joi.object().keys({
  adminsName: Joi.string().alphanum().min(3).max(30).required(),
  emailId: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  password: Joi.string().allow('').allow(null),
  confirm_password: Joi.string().allow('').allow(null),
}).with('password', 'confirm_password');