const express= require('express');
const router=express.Router();
const Role= require('../models/roleschema');
const Permission= require('../models/permissionschema');
const RolePerm= require('../models/role-permission-mapping');

router.get('/',function(req,res,next){
    Role.find().then(function(roles){
        res.send(roles);
    });
});
router.post('/:perm_id',function(req,res,next){
    Role.findOne({role_id:req.body.role_id},function(role){
        if(role){
            console.log("role_id already exists");
        }
        else{
            Role.create(req.body).then(function(role){
                res.send(role);
            })
        }
    });
    RolePerm.create({"role_id":req.body.role_id,"perm_id":req.params.perm_id}).then(function(maps){
            res.send(maps);
            console.log("Mapped");
        });    
});
router.put('/:id',function(req,res,next){
    Role.findOneAndUpdate({role_id:req.params.id},req.body).then(function(){
        Role.findOne({role_id:req.params.id}).then(function(role){
            res.send(role);
        });
    });
});
router.delete('/:id',function(req,res,next){
    Role.findOneAndRemove({role_id:req.params.id}).then(function(role){
        res.send(role);
    });
});
router.get('/permissions',function(req,res,next){
    Permission.find().then(function(permissions){
        res.send(permissions);
    });
});
router.get('/roleperm',function(req,res,next){
    RolePerm.find().then(function(maps){
        res.send(maps);
    });
});
router.delete('/roleperm/:id',function(req,res,next){
    RolePerm.findOneAndRemove({perm_id:req.params.id}).then(function(map){
        res.send(map);
    });
});
module.exports=router;