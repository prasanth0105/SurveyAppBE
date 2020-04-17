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
  if (err.code == 400) {
    res.status(err.code).json({
      message: err.details[0].message,
      status: true
    });
  }
  if (err.code == 409) {
    res.status(409).json({
      message: "username already exist",
      status: true
    });
  }
};
