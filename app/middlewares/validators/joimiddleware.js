
module.exports = (schema) => (req, res, next) => {
  const validation = schema.validate(req.body);
  if (validation.error) {
    validation.error.code = 400;
    return next(validation.error);
  }
  return next();
};
