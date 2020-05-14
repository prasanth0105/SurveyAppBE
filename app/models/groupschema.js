const mongoose= require("mongoose");
const Schema= mongoose.Schema;

const GroupSchema = new Schema({
  group: {
    type: String,
    required: [true, "Role must be provided"]
  }
});

const Group= mongoose.model("group", GroupSchema);
module.exports=Group;
