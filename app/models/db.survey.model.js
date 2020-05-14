// const mongoose = require("mongoose");

// const Schema = mongoose.Schema;

// const SurveySchema = new Schema({
//   survey_owner: {
//     type: String,
//     required: [true, "Survey should have an owner"]
//   },
//   survey_name: {
//     type: String,
//     required: [true, "Survey Name must be provided"]
//   },
//   survey_description: {
//     type: String
//   },
//   survey_published: {
//     type: Boolean,
//     default: false
//   }
// });

// const Survey = mongoose.model("survey", SurveySchema);
// module.exports = Survey;

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SurveySchema = new Schema({
  survey_owner: {
    type: String,
    default: "TEST OWNER -Should Change"
  },
  survey_name: {
    type: String,
    required: [true, "Survey Name must be provided"]
  },
  survey_description: {
    type: String
  },
  survey_published: {
    type: Boolean,
    default: false
  }
});

const Survey = mongoose.model("survey", SurveySchema);
module.exports = Survey;

