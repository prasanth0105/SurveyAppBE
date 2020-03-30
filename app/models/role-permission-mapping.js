const mongoose= require('mongoose');
const Schema= mongoose.Schema;

const RolePermSchema = new Schema({
    role_id:{
        type:Number,
        required:[true,"Role_ID must be provided"]
    },
    perm_id:{
        type:Number,
        required:[true,"Permission_ID must be provided"]
    }
});

const RolePerm= mongoose.model('roleperm',RolePermSchema);
module.exports=RolePerm;