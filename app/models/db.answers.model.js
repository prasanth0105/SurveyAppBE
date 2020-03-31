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
        type:String,
        required:[true,'Should be of \'Check Box\', \'Dropdown\',\'Radio Button\' or \'Text Box\' .']
    },
    option_label:{
        type:String,
        required:[true,'Require a label for every option']
    }
});

const Answer= mongoose.model('answer',AnswerSchema);
module.exports = Answer;