const mongoose= require('mongoose');
const Schema= mongoose.Schema;

const RolePermSchema = new Schema({
    role_id:{
        type:Number
    },
    perm_id:{
        type:Number
    }
});

const RolePerm= mongoose.model('roleperm',RolePermSchema);
module.exports=RolePerm;