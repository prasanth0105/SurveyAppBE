const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SurveyInvitationSchema = new Schema({
  survey_id: {
    type: Schema.Types.ObjectId,
    ref: "survey"
  },
  user_id: {
    type: Number
  }
}, {timestamps: {createdAt: "invited_at"}});

const SurveyInvitationDetails = mongoose.model("survey_invitation_details", SurveyInvitationSchema);
module.exports = SurveyInvitationDetails;
