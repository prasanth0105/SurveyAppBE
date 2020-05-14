/* eslint-disable guard-for-in */
const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();
const bcrypt = require("bcrypt");
const GroupPerm= require("../models/group-permission-mapping");
const User=require("../models/userschema");
const UserGroup=require("../models/user-role-mapping");
const Transaction = require("mongoose-transactions");
const transaction = new Transaction();
// const transport = require('../../misc/mailer');
const joiSchema = require("../models/joi");
const joi = require("../middlewares/validators/joi");
const randomString = require("randomstring");
const jwt=require("jsonwebtoken");
const validateAdmin= require("../middlewares/validators/tokenvalidator").validateAdmin;
// new Admin
const addAdmin=async(req, res, next)=>{
  bcrypt.genSalt(10, async (err, salt)=> {
    bcrypt.hash(req.body.password, salt, async (err, hash)=> {
      req.body.password = hash;
      try {
        const adminMail=req.body.email;
        transaction.insert("user", {username: req.body.username, email: req.body.email, password: hash, active: true});
        transaction.insert("usergroup", {email: adminMail, group: "admin-group"});
        const final = await transaction.run();
        transaction.clean();
        return res.json(final[0]);
      } catch (error) {
        transaction.rollback();
        transaction.clean();
        next({code: 422, message: "Admin creation failed"});
      }
    });
  });
};
  // bcrypt.genSalt(10, async (_err, salt) => {
  //   bcrypt.hash(req.body.password, salt, async (_err, hash) => {
  //     req.body.password = hash;
  //     try {
  //       const adminId = transaction.insert("user", {username: req.body.username, email: req.body.email, password: hash});
  //       const adminRoleId = transaction.insert("userrole", {user_id: adminId});
  //       if (adminRoleId) {
  //         await Role.findOne({role: "admin"})
  //           .then((fetchRole) => {
  //             transaction.update(
  //               "userrole",
  //               adminRoleId,
  //               {$push: {role_id: fetchRole._id}},
  //               {new: true}
  //             );
  //           });
  //       }
  //       const final = await transaction.run();
  //       transaction.clean();
  //       return res.json(final[0]);
  //     } catch (error) {
  //       transaction.rollback();
  //       transaction.clean();
  //       next({code: 422, message: "Admin creation failed"});
  //     }
  //   });
  // });
// };

// register api
const registerData=async (req, res, next)=> {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const secretToken = randomString.generate();
  const active = false;
  const newUser = {
    username: username,
    email: email,
    password: password,
    secretToken: secretToken,
    active: active
  };
  // password hashing
  if (password === confirmPassword) {
    bcrypt.genSalt(10, async (err, salt)=> {
      bcrypt.hash(newUser.password, salt, async (err, hash)=> {
        newUser.password = hash;
        try {
          const userMail= req.body.email;
          transaction.insert("user", {username: req.body.username, email: req.body.email, password: newUser.password, secretToken: newUser.secretToken, active: newUser.active});
          transaction.insert("usergroup", {email: userMail, group: "user-group"});

          // //Compose email
          // const html = `Hi there
          // <br/>
          // Thankyou for registering
          // <br/><br/>
          // Please verify your email by typing the following token
          // <br/>
          // Token:<b>${secretToken}</b>
          // <br/>On the following page:
          // <a href="http://localhost:8080/verify">http://localhost:8080/verify</a>
          // <br/>
          // Have a nice day.`
          // //Send email
          // console.log(newUser.email);
          // transport.sendMail({
          //     from: "sitharakm17@gmail.com",
          //     to: newUser.email,
          //     subject: "Please verify your email",
          //     html: html
          // })

          const final = await transaction.run();
          transaction.clean();
          return res.json(final[0]);
        } catch (error) {
          transaction.rollback();
          transaction.clean();
          next({code: 422, message: "User creation failed"});
        }
      });
    });
  } else {
    res.send("passwords not matching");
  }
};

// seeUserSchema
const seeUser=(req, res, next)=>{
  User.find().then((users)=> {
    res.send(users);
  });
};

// UserRoles
const viewUserRoles=(_req, res, _next)=>{
  UserGroup.find().then((maps)=> {
    res.send(maps);
  });
};

// login api
const loginData= (req, res, next)=> {
  User.find({email: req.body.email}, (err, users)=> {
    if (!users || !users.length) {
      res.send("invalid email");
    }
    if (!users[0].active) {
      res.send("Sorry you have to validate email");
    }

    bcrypt.compare(req.body.password, users[0].password, (err, token)=> {
      if (token) {
        UserGroup.findOne({email: users[0].email}).then((userroles)=>{
          const userGroupName= userroles.group;

          GroupPerm.find({group: userGroupName}).then((userperms)=>{
            const userPermId=userperms[0].perms;


            const Authtoken= jwt.sign({
              username: users[0].username,
              email: users[0].email,
              userId: users[0]._id,
              perms: userPermId
            },
            "secretKEY",
            {
              expiresIn: "24h"
            }
            );
            res.status(200).json({
              message: "Auth success",
              token: Authtoken
            });
          });
        });
        // res.send('user logged in');
      } else {
      }
    });
  });
};
const changeGroup=(req, res, next)=>{
  UserGroup.findOneAndUpdate({email: req.params.email}, req.body).then(()=> {
    UserGroup.findOne({email: req.params.email}).then((group)=> {
      res.send(group);
    });
  });
};
// TOKEN FORMAT
// Authorization: Bearer <access_token>
// verify token
const verifyToken=(req, res, next)=>{
  const bearerHeader=req.headers["authorization"];
  if (typeof bearerHeader!= "undefined") {
    const bearer= bearerHeader.split(" ");
    const bearerToken=bearer[1];
    req.token=bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
};
router.post("/verifyToken", verifyToken, (req, res)=>{
  jwt.verify(req.token, "secretKEY", (err, authData)=>{
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "Token verified",
        data: authData
      });
    }
  });
});
// verify api
const verifyData=(req, res, next)=> {
  const item = {
    active: "true",
    secretToken: ""
  };
  User.updateOne({secretToken: req.body.secretToken}, {$set: item}, (err, users)=> {
    if (err) {
      res.send("user not found");
    } else {
      res.send("you may login now");
    }
  });
};

router.post("/newUser", (req, res, next)=>addAdmin(req, res, next));
router.post("/register", joi.validator(joiSchema.registerInfo), (req, res, next) => registerData(req, res, next));
router.post("/login", joi.validator(joiSchema.loginInfo), (req, res, next) => loginData(req, res, next));
router.get("/users", validateAdmin, (req, res, next)=>seeUser(req, res, next));
router.get("/usergroups", validateAdmin, (req, res, next)=> viewUserRoles(req, res, next));
router.put("/usergroups/:email", validateAdmin, (req, res, next)=>changeGroup(req, res, next));
router.put("/verify", (req, res) => verifyData(req, res));
module.exports = router;
