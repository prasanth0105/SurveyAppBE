const mongoose= require("mongoose");
const Schema= mongoose.Schema;

const UserRoleSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  role_id: {
    type: Schema.Types.ObjectId,
    ref: "role"
  }
});

const UserRole= mongoose.model("userrole", UserRoleSchema);
module.exports=UserRole;
