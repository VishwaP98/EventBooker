

const bcrypt = require('bcryptjs');

const Event = require('../../models/event');
const User = require('../../models/user');
const Booking = require('../../models/booking');

const singleEvent = async eventId => {
    try {
        const event = await Event.findById(eventId);
        return {...event._doc, creator: user.bind(this, event.creator)};
    } catch(err) {
        throw err;
    }
}

const events = eventIds => {
    // list of all the events in MongoDB that have id
    // matching to any one id in eventsIds
    return Event.find({_id: {$in: eventIds}}).then(events => {
        return events.map(event => {
            return {...event._doc, creator: user.bind(this, event.creator)};
        });
    }).catch(err => {
        console.log(err);
        throw err;
    })
}

const user = userId => {
    return User.findById(userId).then(user => {
        return {...user._doc,
                eventsCreated: events.bind(this, ...user._doc.eventsCreated)};
    }).catch(err => {
        console.log(err);
        throw err;
    })
}

module.exports = {
    events: () => {
        return Event.find().then(result => {
            return result.map(event => {
                console.log(event);
                return {...event._doc,
                        creator: user.bind(this, event._doc.creator)};
            });
        }).catch(err => {
            console.log(err);
            throw err;
        });
    },

    bookings: async () => {
        try {
            const bookings = await Booking.find();
            return bookings.map(booking => {
                return {...booking._doc,
                        user: user.bind(this, booking._doc.user),
                        event: singleEvent.bind(this, booking._doc.event),
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()};
            });
        } catch(err) {
            throw err;
        }

    },
    createEvent: (args) => {
        
        const event = new Event({
            title: args.input.title,
            description: args.input.description,
            price: +args.input.price,
            date: new Date().toISOString(),
            creator: "5c8869c5caac53a6795e2e47"
        });

        // save this event into the database
        // this will write event into the database
        let createdEvent;

        return event.save().then(result => {
            console.log(result);
            createdEvent = {...result._doc, creator: user.bind(this, result._doc.creator)};
            // add this event to user's list
            return User.findById("5c8869c5caac53a6795e2e47");
        }).then(user => {
            if(!user) {
                throw Error("User not found.");
            }

            user.eventsCreated.push(event);
            return user.save();
        }).then(result => {
            return createdEvent;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });

    },
    createUser: (args) => {

        // before creating a user, check if a user already exists

        return User.findOne({
            email: args.userInput.email
        }).then(user => {
            if(user) {
                throw new Error("User exists already.");
            }
            return bcrypt.hash(args.userInput.password, 12)
        }).
        then(hashPassword => {
                const user = new User({
                    email: args.userInput.email,
                    password: hashPassword
                });

                return user.save();

            }).then(result => {
                return {...result._doc, password: null};
            }).catch(err => {
                console.log(err);
                throw err;
            })
        
    },
    bookEvent: async (args) => {
        const fetchedEvent = await Event.findOne({_id : args.eventId});
        const booking = new Booking({
            user: "5c8869c5caac53a6795e2e47",
            event: fetchedEvent
        })

        const result = await booking.save();

        return {...result._doc, createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            user: user.bind(this, result.user),
            event: singleEvent.bind(this, result.event)};
    },
    cancelBooking: async (args) => {
        try {
            await Booking.deleteOne({_id: args.bookingID});
        } catch(err) {
            throw err;
        }
    }
}