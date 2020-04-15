const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OptionSchema = new Schema({
  question_id: {
    type: Schema.Types.ObjectId,
    ref: "question"
  },
  option_label: {
    type: String,
    default: null
  }
});

const Option = mongoose.model("option", OptionSchema);
module.exports = Option;
