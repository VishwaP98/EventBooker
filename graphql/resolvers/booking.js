
const Booking = require('../../models/booking');
const Event = require('../../models/event');
const { transformBooking, transformEvent } = require('./common');

module.exports = {
    bookings: async () => {
        try {
            const bookings = await Booking.find();
            return bookings.map(booking => {
                
                return transformBooking(booking);
            
            });
        } catch(err) {
            throw err;
        }

    },
    bookEvent: async (args) => {
        const fetchedEvent = await Event.findOne({_id : args.eventId});
        const booking = new Booking({
            user: "5c8869c5caac53a6795e2e47",
            event: fetchedEvent
        })

        const result = await booking.save();

        return transformBooking(result);
    },
    cancelBooking: async (args) => {
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