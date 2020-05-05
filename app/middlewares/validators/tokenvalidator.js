const UserRole= require("../../models/user-role-mapping");
const Role= require("../../models/roleschema");
const jwt= require("jsonwebtoken");
// TOKEN FORMAT
// Authorization: Bearer <access_token>
// verify token
module.exports = {
  validateAdmin: (req, res, next) => {
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
        result = jwt.verify(req.token, "secretKEY", options);
        req.decoded = result;
        UserRole.findOne({user_id: result.userId}).then((userrole)=>{
          const roleId= userrole.role_id;
          Role.findOne({_id: roleId}).then((role)=>{
            const roleName= role.role;
            if (roleName=="admin") {
              next();
            } else {
              res.send("access denied");
            }
          });
        });
      } catch (err) {
        throw new Error(err);
      }
    } else {
      result = {
        error: `Authentication error. Token required.`,
        status: 401
      };
      res.status(401).send(result);
    }
  },
  validateToken: (req, res, next)=> {
    const bearerHeader=req.headers["authorization"];
    let payload;
    if (typeof bearerHeader!= "undefined") {
      const bearer= bearerHeader.split(" ");
      const bearerToken=bearer[1];
      req.token=bearerToken;
      const options = {
        expiresIn: "24h"
      };
      try {
        result = jwt.verify(req.token, "secretKEY", options);
        req.decoded = payload;
        next();
      } catch (err) {
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

