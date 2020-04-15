const mongoose= require('mongoose');
const Schema= mongoose.Schema;

const PermissionSchema = new Schema({
    perm_id:{
        type:Number,
        required:[true,"Field must not be empty"]
    },
    permission:{
        type:String,
        required:[true,"permission must be provided"]
    }
});

const Permission= mongoose.model('permission',PermissionSchema);
module.exports=Permission;