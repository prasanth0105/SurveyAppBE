const mongoose= require("mongoose");
const Schema= mongoose.Schema;

const PermissionSchema = new Schema({
  permission: {
    type: String,
    enum: ["CREATE_SURVEY", "SUBMIT_RESPONSE", "VIEW_RESPONSE", "VIEW_ALL_SURVEYS", "VIEW_OWN_SURVEYS"],
    required: [true, "permissions must be provided"]
  },
  displayPerms: {
    type: String,
    required: true
  }
});

const Permission= mongoose.model("permission", PermissionSchema);
module.exports=Permission;
