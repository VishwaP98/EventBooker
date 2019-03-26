
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const booking = new Schema({
    event: {
        type: Schema.Types.ObjectId,
        ref: "Event"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }

}, {timestamps : true}); // timeStamps puts created at or updated at 
                         // field for each booking entry

module.exports = mongoose.model("Booking",  booking);