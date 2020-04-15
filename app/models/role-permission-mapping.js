const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RolePermSchema = new Schema({
  role_id: {
    type: Schema.Types.ObjectId,
    ref: "role"
  },
  perm_id: [{
    type: Schema.Types.ObjectId,
    ref: "permission"
  }]
});

const RolePerm = mongoose.model("roleperm", RolePermSchema);
module.exports = RolePerm;
