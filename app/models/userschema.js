const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
    type: "String",
    required: true,
    unique: true
  },
  email: {
    type: "String",
    required: true
  },
  password: {
    type: "String",
    required: true
  },
  secretToken: {
    type: "String",
    default: null
  },
  active: {
    type: "Boolean",
    default: true
  }
});
const User = mongoose.model("user", UserSchema);
module.exports = User;
