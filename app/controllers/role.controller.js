const express= require('express');
const router=express.Router();
const mongoose= require('mongoose');
const Role= require('../models/roleschema');
const Permission= require('../models/permissionschema');
const RolePerm= require('../models/role-permission-mapping');

router.get('/',function(req,res,next){
    Role.find().then(function(roles){
        res.send(roles);
    });
});
router.post('/',async function(req,res,next){
    const session= await mongoose.startSession();
    session.startTransaction();
    try{
        Role.create({"role":req.body.role,"role_id":req.body.role_id}).then(function(roles,err){
            if(err){
                throw new Error('Role creation failed');
            }
            else{
                res.send(roles);
            }
        });
    for(var i in req.body.perm_id){
        RolePerm.insertMany({"role_id":req.body.role_id,"perm_id":req.body.perm_id[i]});
    }
        await session.commitTransaction();
        session.endSession();
    }catch (error){
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
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
router.get('/roleperms',function(req,res,next){
    RolePerm.find().then(function(maps){
        res.send(maps);
    });
});
router.delete('/roleperms/:id',function(req,res,next){
    RolePerm.findOneAndRemove({role_id:req.params.id}).then(function(map){
        res.send(map);
    });
});
module.exports=router;