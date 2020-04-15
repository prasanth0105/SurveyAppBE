const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;
const newSchema = new Schema({
    firstName: {
        type: 'String',
        required: true
    },
    email: {
        type: 'String',
        required: true,
        unique: true
    },
    password: {
        type: 'String',
        required: true
    },
    secretToken: {
        type: 'String'
    },
    active: {
        type: 'Boolean'
    }
});
const userSchema = mongoose.model('user', newSchema);
module.exports = userSchema;