/* eslint-disable guard-for-in */
const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();
const Role = require("../models/roleschema");
const Permission = require("../models/permissionschema");
const RolePerm = require("../models/role-permission-mapping");
const Transaction = require("mongoose-transactions");
const transaction = new Transaction();
const validateToken= require("../middlewares/validators/tokenvalidator").validateToken;
const validateAdmin= require("../middlewares/validators/tokenvalidator").validateAdmin;

const viewRoles= (_req, res)=>{
  Role.find().then((roles)=> {
    res.send(roles);
  }).catch();
};
const addRoles=async(req, res, next)=>{
  try {
    const roleId = transaction.insert("role", {role: req.body.role, role_id: req.body.role_id});
    const newRolePermId = transaction.insert("roleperm", {role_id: roleId});
    if (req.body.perm_id=="") {
      throw new Error("Permission ID required");
    } else if (newRolePermId) {
      for (const i in req.body.perm_id) {
        await Permission.findOne({perm_id: req.body.perm_id[i]})
          .then((fetchPerm) => {
            transaction.update(
              "roleperm",
              newRolePermId,
              {$push: {perm_id: fetchPerm._id}},
              {new: true}
            );
          });
      }
    }
    const final = await transaction.run();
    transaction.clean();
    return res.json(final[0]);
  } catch (error) {
    transaction.rollback();
    transaction.clean();
    next({code: 422, message: "Invalid Permission Id"});
  }
};
const editRoles= (req, res, _next)=>{
  Role.findOneAndUpdate({role_id: req.params.id}, req.body).then(()=> {
    Role.findOne({role_id: req.params.id}).then((role)=> {
      res.send(role);
    });
  });
};
const deleteRoles=(req, res, _next)=>{
  Role.findByIdAndRemove({_id: req.params.id}).then((role) =>{
    RolePerm.findOneAndRemove({role_id: req.params.id}).then(()=>{
      res.send(role);
    });
  });
};
const viewPermissions=(_req, res, _next)=>{
  Permission.find().then((permissions)=> {
    res.send(permissions);
  });
};
const viewMaps=(_req, res, _next)=>{
  RolePerm.find().then((maps)=> {
    res.send(maps);
  });
};
const addPermissions=async(req, res, _next)=>{
  res.json(await Permission.create(req.body));
};

router.get("/roles", validateToken, (req, res, next)=> viewRoles(req, res, next));
router.post("/roles", validateAdmin, (req, res, next)=>addRoles(req, res, next));
router.put("/roles/:id", validateAdmin, (req, res, next)=>editRoles(req, res, next));
router.delete("/roles/:id", validateAdmin, (req, res, next)=>deleteRoles(req, res, next));
router.get("/permissions", validateAdmin, (req, res, next)=> viewPermissions(req, res, next));
router.get("/roleperms", validateToken, (req, res, next)=> viewMaps(req, res, next));
router.post("/permissions", validateAdmin, (req, res, next)=> addPermissions(req, res, next));
module.exports = router;
