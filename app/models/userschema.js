const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
    type: "String",
    required: true
  },
  email: {
    type: "String",
    required: true,
    unique: true
  },
  password: {
    type: "String",
    required: true
  },
  secretToken: {
    type: "String"
  },
  active: {
    type: "Boolean"
  }
});
const User = mongoose.model("user", UserSchema);
module.exports = User;
