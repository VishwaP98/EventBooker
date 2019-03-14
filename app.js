const express = require('express');
const bodyParser = require('body-parser');
const graphQlHttp = require('express-graphql');
const mongoose = require('mongoose');
const app = express(); // uses express imported from express package

const resolvers = require("./graphql/resolvers/index");
const schema = require("./graphql/schema/index");

app.use(bodyParser.json());

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
    app.listen(3000);
}).catch(err => {
    console.log(err);
})