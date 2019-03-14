
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const user = new Schema({

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    eventsCreated: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Event' // use the exact name as in event.js export
        }
    ]

})

module.exports = mongoose.model("User", user);