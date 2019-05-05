
const Booking = require('../../models/booking');
const Event = require('../../models/event');
const { transformBooking, transformEvent } = require('./common');

module.exports = {
    bookings: async (args, req) => {
        console.log(req.isAuthorized + " is the status of user");
        if(!req.isAuthorized) {
            throw new Error("User is not authorized");
        }

        try {
            const bookings = await Booking.find({user: req.userId});
            return bookings.map(booking => {
                
                return transformBooking(booking);
            
            });
        } catch(err) {
            throw err;
        }

    },
    bookEvent: async (args, req) => {
        const fetchedEvent = await Event.findOne({_id : args.eventId});
        const booking = new Booking({
            user: req.userId,
            event: fetchedEvent
        })

        const result = await booking.save();

        return transformBooking(result);
    },
    cancelBooking: async (args, req) => {

        if(!req.isAuthorized) {
            throw new Error("User is not authorized");
        }

        try {
            const booking = await Booking.findById(args.bookingID).populate('event');
            const event = transformEvent(booking.event);
            await Booking.deleteOne({_id: args.bookingID});
            return event;
        } catch(err) {
            throw err;
        }
    }
}