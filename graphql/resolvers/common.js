
const Event = require('../../models/event');
const User = require('../../models/user');
const Booking = require('../../models/booking');

const singleEvent = async eventId => {
    try {
        const event = await Event.findById(eventId);
        return transformEvent(event);
    } catch(err) {
        throw err;
    }
};

const events = async eventIds => {
    // list of all the events in MongoDB that have id
    // matching to any one id in eventsIds

    try {
        const events = await Event.find({_id : {$in: eventIds}});
        return events.map(event => {
            return transformEvent(event);
        });

    } catch (err) {
        console.log(err);
        throw err;
    }
};

const user = async userId => {

    try {

        const userFound = await User.findById(userId);

        return { 
            ...userFound._doc,
            eventsCreated: events.bind(this, userFound.eventsCreated)
        };
    
    } catch (err) {
        console.log(err);
        throw err;
    }

};

const transformEvent = async event => {
    return {
        ...event._doc,
        creator: user.bind(this, event.creator)
    };
};


const transformBooking = async booking => {
    return {...booking._doc,
        user: user.bind(this, booking._doc.user),
        event: singleEvent.bind(this, booking._doc.event),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()};

};

exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;