/* eslint-disable guard-for-in */
const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();
const Group = require("../models/groupschema");
const Permission = require("../models/permissionschema");
const GroupPerm = require("../models/group-permission-mapping");
const UserGroup= require("../models/user-role-mapping");
const Transaction = require("mongoose-transactions");
const transaction = new Transaction();
const validateToken= require("../middlewares/validators/tokenvalidator").validateToken;
const validateAdmin= require("../middlewares/validators/tokenvalidator").validateAdmin;

const viewRoles= (_req, res, next)=>{
  Group.find().then((roles)=> {
    res.send(roles);
  }).catch();
};
const addRoles=async(req, res, next)=>{
  try {
    const groupName= req.body.group;
    transaction.insert("group", {group: groupName});
    const newRolePermId = transaction.insert("groupperm", {group: groupName});
    if (req.body.perms=="") {
      throw new Error("Permission ID required");
    } else if (newRolePermId) {
      for (const i in req.body.perms) {
        await Permission.findOne({permission: req.body.perms[i]})
          .then((fetchPerm) => {
            transaction.update(
              "groupperm",
              newRolePermId,
              {$push: {perms: fetchPerm.displayPerms}},
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
    next({code: 422, message: "Invalid Permission"});
  }
};
const editRoles= (req, res, _next)=>{
  Group.findOneAndUpdate({group: req.params.grpname}, req.body).then((updtd)=> {
    GroupPerm.findOneAndUpdate({group: updtd.group}, {perms: req.body.perms}).then(()=>{
      GroupPerm.findOne({group: updtd.group}).then((role)=> {
        res.send(role);
      });
    });
  });
};
const deleteGroups=(req, res, _next)=>{
  Group.findByIdAndRemove({_id: req.params.id}).then((grp)=>{
    GroupPerm.findOneAndRemove({group: grp.group}).then(()=>{
      UserGroup.find({group: grp.group}).then((change)=>{
        if (change) {
          for (i in change) {
            UserGroup.findOneAndUpdate({email: change[i].email}, {$set: {group: "user-group"}}).then(()=>{
              res.send(`Groupname set to default user-group for ${change[i].email}`);
            });
          }
        }
      });
      res.send(grp);
    });
  });
};
const deleteGroupPerms=(req, res, _next)=>{
  GroupPerm.findByIdAndRemove({_id: req.params.id}).then((grp)=>{
    res.send(grp);
  });
};
const viewPermissions=(_req, res, _next)=>{
  Permission.find().then((permissions)=> {
    res.send(permissions);
  });
};
const viewMaps=(_req, res, _next)=>{
  GroupPerm.find().then((maps)=> {
    res.send(maps);
  });
};
const addPermissions=async(req, res, _next)=>{
  res.json(await Permission.create(req.body));
};

router.get("/groups", validateToken, (req, res, next)=> viewRoles(req, res, next));
router.post("/groups", validateAdmin, (req, res, next)=>addRoles(req, res, next));
router.put("/groups/:grpname", validateAdmin, (req, res, next)=>editRoles(req, res, next));
router.delete("/groups/:id", validateAdmin, (req, res, next)=>deleteGroups(req, res, next));
router.delete("/groupperms/:id", validateAdmin, (req, res, next)=>deleteGroupPerms(req, res, next));
router.get("/permissions", validateToken, (req, res, next)=> viewPermissions(req, res, next));
router.get("/groupperms", validateToken, (req, res, next)=> viewMaps(req, res, next));
router.post("/permissions", validateAdmin, (req, res, next)=> addPermissions(req, res, next));
module.exports = router;
