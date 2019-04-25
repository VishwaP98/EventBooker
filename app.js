const express = require('express');
const bodyParser = require('body-parser');
const graphQlHttp = require('express-graphql');
const mongoose = require('mongoose');
const app = express(); // uses express imported from express package
const isAuthorized = require('./helpers/checkAuthorized')

const resolvers = require("./graphql/resolvers/index");
const schema = require("./graphql/schema/index");

app.use(bodyParser.json());

app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', "*"); // every host can send request to this server
    res.setHeader('Access-Control-Allow-Methods', "POST,GET,OPTIONS"); //  allow these methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if(req.method === 'OPTIONS') {
        return res.sendStatus(200); // handle this request with response status 200
    }

    // otherwise let the request continue its journey
    next();

});

app.use(isAuthorized); // uses as a middleware to check if user authorized or not


app.use('/graphql', graphQlHttp({
    schema: schema,  // schema points to valid graphql schema
    rootValue: resolvers // rootValue points to an object that contains all
                  // the resolver functions
    , graphiql: true
}));


// we only start our server if we sucessfully connect to the MongoDB
// database
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${
    process.env.MONGO_PASSWORD
}@cluster0-3uycy.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`).then(() => {
    app.listen(8000); // frontend server runs on port 3000 as default
}).catch(err => {
    console.log(err);
})