'use strict';

let cache = require('./cache.js');
const axios = require('axios');
const res = require('express/lib/response');

module.exports = getWeather;

async function getWeather(latitude, longitude) {

    const key = 'weather-' + latitude + longitude;
    const url = `http://api.weatherbit.io/v2.0/forecast/daily?&lat=${latitude}&lon=${longitude}&key=${process.env.WEATHER_API_KEY}&days=5`;

    if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
        console.log('Cache hit');
        res.status(200).send(cache[key].data);
    } else {
        console.log('Cache miss');
        cache[key] = {};
        cache[key].timestamp = Date.now();
        cache[key].data = await axios.get(url).then(res => parseWeather(res.data));
        console.log(`here ${res.data}`);
    }
  
    return cache[key].data;
}

function parseWeather(weatherData) {
    try {
        const weatherSummaries = weatherData.data.map(day => {
        return new Forecast(day);
        });
        return Promise.resolve(weatherSummaries);
    } catch (e) {
        return Promise.reject(e);
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