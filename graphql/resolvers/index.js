
const userResolver = require('./user');
const eventResolver = require('./event');
const bookingResolver = require('./booking');

// Have to ensure that there are no duplicates in the schema names
// as it can cause problems

const rootResolver = {
    ...userResolver,
    ...eventResolver,
    ...bookingResolver
};

module.exports = rootResolver;