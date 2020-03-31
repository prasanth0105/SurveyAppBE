const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  survey_id: {
    type: Schema.Types.ObjectId,
    ref: "survey",
  },
  question: {
    type: String,
    required: [true, "There should be question!!"],
  },
  answers: [
    {
      type: Schema.Types.ObjectId,
      ref: "answer",
    },
  ],
});

const Question = mongoose.model("question", QuestionSchema);
module.exports = Question;
