const {Schema, model} = require('mongoose');

const eventSchema = new Schema({
    nameEvent: {
        type: String,
        required: true
    },
    date: {
        type: Array,
        required: true
    },
    username: {
        type: Array
    }
});

module.exports = model('Calendars', eventSchema);