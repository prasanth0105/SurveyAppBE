const mongoose= require('mongoose');
const Schema= mongoose.Schema;

const MapSchema = new Schema({
    role_id:{
        type:Number,
        required:[true,"Role_ID must be provided"]
    },
    perm_id:{
        type:Number,
        required:[true,"Permission_ID must be provided"]
    }
});

const Map= mongoose.model('map',MapSchema);
module.exports=Map;