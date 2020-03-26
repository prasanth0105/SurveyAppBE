const express= require('express');
const router=express.Router();
const Role= require('../models/roleschema');
const Permission= require('../models/permissionschema');
const Map= require('../models/role-permission-mapping');

router.get('/getRoles',function(req,res,next){
    Role.find().then(function(roles){
        res.send(roles);
    });
});
router.post('/createRoles',function(req,res,next){
   Role.create(req.body).then(function(role){
    var temp= new Map({"role_id":req.body.role_id,"perm_id":req.body.perm_id});
    temp.save(function(){
        console.log("Mapped");
    });
       res.send(role);
   }).catch(next);
});
router.put('/editRoles/:id',function(req,res,next){
    Role.findOneAndUpdate({role_id:req.params.id},req.body).then(function(){
        Role.findOne({role_id:req.params.id}).then(function(role){
            res.send(role);
        });
    });
});
router.delete('/deleteRoles/:id',function(req,res,next){
    Role.findOneAndRemove({role_id:req.params.id}).then(function(role){
        res.send(role);
    });
});
router.get('/permissions',function(req,res,next){
    Permission.find().then(function(permissions){
        res.send(permissions);
    });
});
router.get('/maps',function(req,res,next){
    Map.find().then(function(maps){
        res.send(maps);
    });
});
router.delete('/maps/:id',function(req,res,next){
    Map.findOneAndRemove({perm_id:req.params.id}).then(function(map){
        res.send(map);
    });
});
module.exports=router;