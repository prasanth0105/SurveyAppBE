const mongoose= require("mongoose");
const Schema= mongoose.Schema;

const UserGroupSchema = new Schema({
  email: {
    type: String,
    ref: "user"
  },
  group: {
    type: String,
    ref: "group"
  }
});

const UserGroup= mongoose.model("usergroup", UserGroupSchema);
module.exports=UserGroup;
