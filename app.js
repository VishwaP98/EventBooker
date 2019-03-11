const express = require('express')
const bodyParser = require('body-parser')

const app = express(); // uses express imported from express package

app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    res.send("Hello World, This is Vishwa");
})

app.listen(3000);