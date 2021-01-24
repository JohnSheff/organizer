const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        index: {unique: true}
    },
    phone: {
        type: Number,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        index: {unique: true}
    },
    description: {
        type: String,
        required: true,
        maxlength: [120, "максимальная длина заметки 120"]
    },
    date: {
        type: Date,
        required: true
    },
});

module.exports = model('Contact', userSchema);