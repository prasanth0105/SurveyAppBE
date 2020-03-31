module.exports = (err, res, next) => {
  if(!err.code){
    err.code = 401;
    err.message = "Database Error";
  }
    res.status(err.code).json({
      message: err.message
    });
    next();
};
