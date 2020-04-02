const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SurveySchema = new Schema({
  survey_owner: {
    type: String,
    required: [true, "Survey should have an owner"]
  },
  survey_name: {
    type: String,
    required: [true, "Survey Name must be provided"]
  },
  question_set: [
    {
      type: Schema.Types.ObjectId,
      ref: "question"
    }
  ],
  invited: {
    type: Number,
    default: 0
  },
  attended: {
    type: String,
    default: 0
  }
});

const Survey = mongoose.model("survey", SurveySchema);
module.exports = Survey;
