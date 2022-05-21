'use strict'

const axios = require('axios');

let cache = {};

module.exports = getMovies;

async function getMovies(req,res,next) {
    try {
        let searchCity = req.query.city_name;

        let key = searchCity + 'Data'

        let timeOkToCache = 1000 * 60 * 60 * 24 * 30;
        // let timeOkToCacheTest = 1000 * 20;
        if(cache[key] && (Date.now() - cache[key].timestamp < timeOkToCache)) {
            console.log("you already made this request");
            res.status(200).send(cache[key].data);
        } else {
            console.log('new search request');
            let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchCity}`

            let results = await axios.get(url);

            let dataToSend = results.data.results.map( movie => {
                return new Movie(movie);
            });

            cache[key] = {
                data:dataToSend,
                timestamp: Date.now()
            }
            res.status(200).send(dataToSend);
        }
    } catch (error) {
        next(error);
        console.log(error);
    }
}

class Movie {
    constructor(movieObject) {
        this.title = movieObject.original_title;
        this.overview = movieObject.overview;
        this.avg_votes = movieObject.vote_average;
        this.vote_count = movieObject.vote_count;
        this.img_url = movieObject.poster_path ? "https://image.tmdb.org/t/p/w500"  + movieObject.poster_path: '';
        this.popularity = movieObject.popularity;
        this.released_on = movieObject.release_date;
    }
}

module.exports = getMovies;