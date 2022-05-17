'use strict';

console.log('Our first server');

const { response } = require('express');
// REQUIRE
// things we need to build a server

const express = require('express');

let data = require('./data/weather.json');

require('dotenv').config();
// USE
const app = express();

const PORT = process.env.PORT || 3002;

// ROUTES

// basic default route
app.get('/', (req, res) => {
    res.send('hellooo');
});

app.get('/hello', (req,res) => {
    console.log(req.query.name);
    res.send(`Hello! ${req.query.name}`);
});

// catch all "star route"
app.get('*', (req, res) => {
    res.send('Error 404');
})

// ERRORS

// LISTEN
// start the server
// listen is an Express method thta takes in 2 arguements: a port value and a callback function
app.listen(PORT, () => console.log(`listening on port ${PORT}`));