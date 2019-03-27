const Event = require('../../models/event');
const User = require('../../models/user');
const { transformEvent } = require('./common');

module.exports = {
    events: async () => {
        try {
            const events = await Event.find();
            return events.map(event => {
                return transformEvent(event);
            });

        } catch (err) {
            throw err;
        }
    },
    createEvent: async (args) => {
        try {
            const event = Event({
                title: args.input.title,
                description: args.input.description,
                price: +args.input.price,
                date: new Date().toISOString(),
                creator: "5c8869c5caac53a6795e2e47"
            });

            // save this event into the database
            // this will write event into the database
            let createdEvent;

            const result = await event.save();

            if(!result) {
                throw new Error("Problems saving object");
            }

            createdEvent = transformEvent(result);

            const creatorResult = await User.findById("5c8869c5caac53a6795e2e47").populate("eventsCreated");

            if(!creatorResult) {
                throw new Error("User not found.");
            }

            creatorResult.eventsCreated.push(createdEvent);
            await creatorResult.save();
            return createdEvent;

        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}