/* eslint-disable guard-for-in */
const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();
const Group = require("../models/groupschema");
const Permission = require("../models/permissionschema");
const GroupPerm = require("../models/group-permission-mapping");
const Transaction = require("mongoose-transactions");
const transaction = new Transaction();
const validateToken= require("../middlewares/validators/tokenvalidator").validateToken;
const validateAdmin= require("../middlewares/validators/tokenvalidator").validateAdmin;

const adminPerms= ["CREATE_SURVEY", "SUBMIT_RESPONSE", "VIEW_RESPONSE", "VIEW_ALL_SURVEYS"];
const userPerms= ["SUBMIT_RESPONSE", "VIEW_OWN_SURVEYS"];

Group.findOne({group: "admin-group"}).then(async (group)=>{
  if (!group) {
    try {
      transaction.insert("group", {group: "admin-group"});
      const newRolePermId = transaction.insert("groupperm", {group: "admin-group"});
      for (const i in adminPerms) {
        await Permission.findOne({permission: adminPerms[i]})
          .then((fetchPerm) => {
            transaction.update(
              "groupperm",
              newRolePermId,
              {$push: {perms: fetchPerm.displayPerms}},
              {new: true}
            );
          });
      }
      const final = await transaction.run();
      transaction.clean();
      return res.json(final[0]);
    } catch (error) {
      transaction.rollback();
      transaction.clean();
    }

    try {
      transaction.insert("group", {group: "user-group"});
      const newRolePermId = transaction.insert("groupperm", {group: "user-group"});
      for (const i in userPerms) {
        await Permission.findOne({permission: userPerms[i]})
          .then((fetchPerm) => {
            transaction.update(
              "groupperm",
              newRolePermId,
              {$push: {perms: fetchPerm.displayPerms}},
              {new: true}
            );
          });
      }
      const final = await transaction.run();
      transaction.clean();
      return res.json(final[0]);
    } catch (error) {
      transaction.rollback();
      transaction.clean();
    }
  }
});

const viewGroups= (_req, res, next)=>{
  Group.find().then((roles)=> {
    res.send(roles);
  }).catch();
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
router.get("/groups", validateToken, (req, res, next)=> viewGroups(req, res, next));
router.get("/permissions", validateAdmin, (req, res, next)=> viewPermissions(req, res, next));
router.get("/groupperms", validateToken, (req, res, next)=> viewMaps(req, res, next));
module.exports = router;
