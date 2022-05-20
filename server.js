'use strict';

// REQUIRE
// things we need to build a server
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const axios = require('axios');
const getMovies = require('./modules/movies');
const getWeather = require('./modules/weather');

// let data = require('./data/weather.json');

// USE
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

// ROUTES

// basic default route
app.get('/', (req, res) => {
    res.send('hellooo');
});

// /hello?name=sam  **present for future me :)
app.get('/hello', (req,res) => {
    console.log(req.query.name);
    res.send(`Hello! ${req.query.name}`);
});

app.get('/weather', getWeather);

app.get('/movies', getMovies);

// catch all "star route"
app.get('*', (req, res) => {
    res.status(404).send('Not Found')
})

// ERRORS
app.use((error, req, res, next) => {
    console.log(error.message)
    res.status(500).send(error.message)
});

// CLASSES 
// Inside modules

// LISTEN
// start the server
// listen is an Express method thta takes in 2 arguements: a port value and a callback function
app.listen(PORT, () => console.log(`listening on port ${PORT}`));