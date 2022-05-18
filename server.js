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

// /hello?name=sam  **present for future me :)
app.get('/hello', (req,res) => {
    console.log(req.query.name);
    res.send(`Hello! ${req.query.name}`);
});

app.get('/weather', (req,res) => {
    // query parameters here?
    try {
        let selectedCity = data.find( (location) => 
            location.city_name === req.query.city_name);

        // res.send(`${selectedCity.city_name}`);
        let dataToSend = selectedCity.data.map( (day) => {
            return new Forecast(day);
        });
        console.log(dataToSend);
        res.send(dataToSend);
    } catch (error) {
        // add error catch later
        console.log(error);
    }
})

// catch all "star route"
app.get('*', (req, res) => {
    res.send('Error 404');
})

// ERRORS

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