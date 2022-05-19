'use strict';

// REQUIRE
// things we need to build a server
require('dotenv').config();
const cors = require('cors');
const express = require('express');
// const { response } = require('express');
const axios = require('axios');

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

app.get('/weather', async (req,res, next) => {
    // query parameters here?
    try {
        let searchLon = req.query.lon;
        let searchLat = req.query.lat;

        let url =  `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${searchLat}&lon=${searchLon}&key=${process.env.WEATHER_API_KEY}&units=I&days=5`

        let results = await axios.get(url);
        console.log(results.data.data[0]);
        let dataToSend = results.data.data.map( day => {
            return new Forecast(day);
        });

        console.log(dataToSend);
        res.send(dataToSend);

        // let selectedCity = data.find( (location) => location.city_name === req.query.city_name)

        // let dataToSend = selectedCity.data.map( (day) => {
        //     return new Forecast(day);
        // });
        // res.send(dataToSend);
    } catch (error) {
        // add error catch later
        next(error);
        console.log(error);
    }
})

// app.get('/movies', async (req,res,next) => {
//     try {
//         let searchCity = req.query.city_name;

//         let url 
//     }
// });

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
class Forecast {
    constructor(dayObject) {
        this.date = dayObject.valid_date;
        this.description = dayObject.weather.description;
        this.low_temp = dayObject.low_temp;
        this.high_temp = dayObject.high_temp;
    }
}

/*
class Movie {
    constructor(movieObject???) {
        this.title = movieObject.original_title;
        this.overview = movieObject.overview;
        this.avg_votes = movieObject.vote_average;
        this.vote_count = movieObject.vote_count;
        this.img_url = movieObject.poster_path;
        this.popularity = movieObject.popularity;
        this.released_on = movieObject.release_date;
    }
}
*/

// LISTEN
// start the server
// listen is an Express method thta takes in 2 arguements: a port value and a callback function
app.listen(PORT, () => console.log(`listening on port ${PORT}`));