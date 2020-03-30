const mongoose= require('mongoose');
const Schema= mongoose.Schema;

const RoleSchema = new Schema({
    role:{
        type:String,
        required:[true,"Role must be provided"]
    },
    role_id:{
        type:Number,
        required:[true,"Role_ID must be provided"]
    }
});

const Role= mongoose.model('role',RoleSchema);
module.exports=Role;