/* eslint-disable no-console */
module.exports = (err, res = null, next = null) => {
  if (!err.code) {
    err.code = 502;
    err.message = "Database Error";
  }
  res.status(err.code).json({
    message: err.message
  });
  console.log(err.message);
  next();
};
