
const Event = require('../../models/event');
const User = require('../../models/user');
const Booking = require('../../models/booking');
const DataLoader = require('dataloader');


const eventLoader = new DataLoader(eventIds => {
    return events(eventIds);
});

const userLoader = new DataLoader(userIds => {
    return User.find({_id: {$in: userIds}});
})

const singleEvent = async eventId => {
    try {
        const event = await eventLoader.load(eventId.toString());
        return event;
    } catch(err) {
        throw err;
    }
};

const events = async eventIds => {
    // list of all the events in MongoDB that have id
    // matching to any one id in eventsIds
    console.log("The provided eventIds are : " + eventIds);
    console.log("--------------------------------------");
    try {
        const events = await Event.find({ _id: { $in: eventIds } });
        console.log("The processed events are : " + events);
        const transformedEvents = await events.map(event => {
            return transformEvent(event);
        });

        console.log("The transformed events are : " + transformedEvents);
        return transformedEvents;
    } catch (err) {
        throw err;
    }
};

const user = async userId => {

    try {
        const userFound = await userLoader.load(userId.toString());
        return { 
            ...userFound._doc,
            eventsCreated: () => eventLoader.loadMany(userFound._doc.eventsCreated)
        };
    
    } catch (err) {
        console.log(err);
        throw err;
    }

};

const transformEvent = async event => {
    return {
        ...event._doc,
        creator: user.bind(this, event._doc.creator)
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