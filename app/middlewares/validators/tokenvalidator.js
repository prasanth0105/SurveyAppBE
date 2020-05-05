const UserGroup= require("../../models/user-role-mapping");
const Group= require("../../models/groupschema");
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
        UserGroup.findOne({email: result.email}).then((usergroup)=>{
          const groupName= usergroup.group;
          Group.findOne({group: groupName}).then((grp)=>{
            const userGrp= grp.group;
            if (userGrp=="admin-group") {
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

