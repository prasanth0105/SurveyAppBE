const mongoose= require("mongoose");
const Schema= mongoose.Schema;

const GroupPermSchema = new Schema({
  group: {
    type: String,
    ref: "group"
  },
  perms: [{
    type: String,
    ref: "permission"
  }]
});

const GroupPerm= mongoose.model("groupperm", GroupPermSchema);
module.exports=GroupPerm;
