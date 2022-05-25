'use strict';

require('dotenv').config();
const cors = require('cors');
const express = require('express');
const axios = require('axios');
const getMovies = require('./modules/movies');

const getWeather = require('./modules/weather.js');
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/weather', weatherHandler);

function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  console.log(lat,lon);
  getWeather(lat, lon)
  .then(summaries => response.send(summaries))
  .catch((error) => {
    console.error(error);
    response.status(200).send('Sorry. Something went wrong!')
  });
}  

app.get('/movies', getMovies);

app.listen(PORT, () => console.log(`Server up on ${PORT}`));