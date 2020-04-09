const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SurveyResponseSchema = new Schema({
  survey_id: {
    type: Schema.Types.ObjectId,
    ref: "survey"
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  question_options: [{
    question_id: {
      type: Schema.Types.ObjectId,
      ref: "question"
    },
    option_id: {
      type: Schema.Types.ObjectId,
      ref: "option"
    },
    textBox_data: {
      type: String,
      default: null
    }
  }]
});

const SurveyResponse = mongoose.model("survey_response", SurveyResponseSchema);
module.exports = SurveyResponse;
