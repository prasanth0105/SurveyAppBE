const jwt= require("jsonwebtoken");
// TOKEN FORMAT
// Authorization: Bearer <access_token>
// verify token
module.exports = {
  validateToken: (req, res, next) => {
    const bearerHeader=req.headers["authorization"];
    let result;
    if (typeof bearerHeader!= "undefined") {
      const bearer= bearerHeader.split(" ");
      const bearerToken=bearer[1];
      req.token=bearerToken;
      const options = {
        expiresIn: "24h"
      };
      try {
        // verify makes sure that the token hasn't expired and has been issued by us
        result = jwt.verify(req.token, "secretKEY", options);

        // Let's pass back the decoded token to the request object
        req.decoded = result;
        // We call next to pass execution to the subsequent middleware
        next();
      } catch (err) {
        // Throw an error just in case anything goes wrong with verification
        throw new Error(err);
      }
    } else {
      result = {
        error: `Authentication error. Token required.`,
        status: 401
      };
      res.status(401).send(result);
    }
  }
};

