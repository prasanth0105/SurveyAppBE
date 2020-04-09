/* eslint-disable no-console */
module.exports = (err, res = null, next = null) => {
  if (!err.code) {
    err.code = 501;
    err.message = "Database Validation Failed";
  }
  res.status(err.code).json({
    message: err.message
  });
  console.log(err.message);
  next();
};
