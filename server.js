'use strict';

console.log('Our first server');

require('dotenv').config();
const cors = require('cors');
const express = require('express');
// const { response } = require('express');
const axios = require('axios');
// REQUIRE
// things we need to build a server


let data = require('./data/weather.json');


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

app.get('/weather', (req,res) => {
    // query parameters here?
    try {
        let selectedCity = data.find( (location) => location.city_name === req.query.city_name)



        let dataToSend = selectedCity.data.map( (day) => {
            return new Forecast(day);
        });
        res.send(dataToSend);
    } catch (error) {
        // add error catch later
        next(error);
        console.log(error);
    }
})

// catch all "star route"
app.get('*', (req, res) => {
    res.status(404).send('Not Found')
})

// ERRORS
app.use((error, req, res, next) => {
    console.log(error.message)
    response.status(500).send(error.message)
});

// CLASSES 
class Forecast {
    constructor(dayObject) {
        this.date = dayObject.valid_date;
        this.description = dayObject.weather.description;
    }
}

// LISTEN
// start the server
// listen is an Express method thta takes in 2 arguements: a port value and a callback function
app.listen(PORT, () => console.log(`listening on port ${PORT}`));