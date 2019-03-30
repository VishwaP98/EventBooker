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
    createEvent: async (args, req) => {
        
        if(!req.isAuthorized) {
            throw new Error("User is not authorized");
        }

        const event = new Event({
            title: args.input.title,
            description: args.input.description,
            price: +args.input.price,
            date: new Date().toISOString(),
            creator: "5c9be2b2d0122d28752115eb"
        });

        // save this event into the database
        // this will write event into the database
        let createdEvent;
        
        try {
        

            // first of all check if the user is valid or not

            const creatorResult = await User.findById("5c9be2b2d0122d28752115eb").populate("eventsCreated");

            if(!creatorResult) {
                throw new Error("User not found.");
            }

            const result = await event.save(); // only save if the user is valid.

            if(!result) {
                throw new Error("Problems saving object");
            }

            createdEvent = await transformEvent(result);
            
            console.log("createdEvent is " + createdEvent);
            creatorResult.eventsCreated.push(createdEvent);
            console.log("New eventsCreated is : " + creatorResult.eventsCreated);
            await creatorResult.save();
            return createdEvent;

        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}