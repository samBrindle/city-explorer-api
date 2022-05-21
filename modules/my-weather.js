'use strict'

const axios = require('axios');

let cache = require('./cache.js');

// module.exports = getWeaher;


async function getWeather(req,res, next) {
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
    } catch (error) {
        // add error catch later
        next(error);
        console.log(error);
    }
}

class Forecast {
    constructor(dayObject) {
        this.date = dayObject.valid_date;
        this.description = dayObject.weather.description;
        this.low_temp = dayObject.low_temp;
        this.high_temp = dayObject.high_temp;
    }
}

module.exports = getWeather;