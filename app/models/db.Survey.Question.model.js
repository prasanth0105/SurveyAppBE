const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  survey_id: {
    type: Schema.Types.ObjectId,
    ref: "survey"
  },
  question: {
    type: String,
    required: [true, "Question Required"]
  },
  question_type: {
    type: String,
    enum: ["CHECK_BOX", "RADIO_BUTTON", "TEXT_BOX", "DROP_DOWN"],
    required: [true, "Invalid Option Type"]
  }
});

const Question = mongoose.model("question", QuestionSchema);
module.exports = Question;
