const mongoose= require('mongoose');
const Schema= mongoose.Schema;

const AnswerSchema = new Schema({
    survey_id:{
        type: Schema.Types.ObjectId,
        ref: 'survey'
    },
    question_id:{
        type: Schema.Types.ObjectId,
        ref: 'question'
    },
    option_type:{
        type:String
    },
    option_label:{
        type:String
    }
});

const Answer= mongoose.model('answer',AnswerSchema);
module.exports = Answer;