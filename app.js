const express = require('express');
const bodyParser = require('body-parser');
const graphQlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express(); // uses express imported from express package

app.use(bodyParser.json());

app.use('/graphql', graphQlHttp({
    schema: buildSchema(`

        type RootQuery {
            events: [String!]!
        }

        type RootMutation {
            createEvent(name: String): String
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    
    `),  // schema points to valid graphql schema
    rootValue: {
        events: () => {
            return ['Event1', 'Event2', 'Event3']
        },
        createEvent: (args) => {
            const eventName = args.name;
            return eventName + " is good";
        }

    } // rootValue points to an object that contains all
                  // the resolver functions
    , graphiql: true
}));


app.listen(3000);