const axios = require('axios');
const { response } = require('express');
const cache = require('./newCache')

class Movie {
  constructor(movie) {
    this.title = movie.title;
    this.posterImg = movie.poster_path;
  }
}

async function getMovies(req, res, next) {
  try {
    let userCity = req.query.city_name;
    let key = `${userCity}Movie`;
    if (cache[key] && (Date.now() - cache[key].timeStamp) < 10000000) {
      console.log('Cache was hit, images are got');
      console.log(cache[key].data);
      res.status(200).send(cache[key].data);
    } else {
      let movieURL = `https://api.themoviedb.org/3/search/movie/?api_key=${process.env.MOVIES_API_KEY}&query=${userCity}&include_adult=false&page=1`;
      let movieData = await axios.get(movieURL);
      const topFive = movieData.data.results.splice(0, 5);
      let movieDataToSend = topFive.map(movie => new Movie(movie))
      cache[key] = { data: movieDataToSend, timeStamp: Date.now() };
      console.log('missed cache');
      res.status(200).send(movieDataToSend);
    }

  } catch (error) {
    next(error);
  }
};


module.exports = getMovies;
