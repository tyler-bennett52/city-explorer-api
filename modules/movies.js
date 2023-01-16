const axios = require('axios');

class Movie {
  constructor(movie) {
    this.title = movie.title;
    this.posterImg = movie.poster_path;
  }
}

async function getMovies(req, res, next){
  try {
    let userCity = req.query.city_name;
    let movieURL = `https://api.themoviedb.org/3/search/movie/?api_key=${process.env.MOVIES_API_KEY}&query=${userCity}&include_adult=false&page=1`;
    // let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIES_API_KEY}&query=${userCity}&page=1&include_adult=false`
    let movieData = await axios.get(movieURL);
    const topFive = movieData.data.results.splice(0, 5);
    let movieDataToSend = topFive.map(movie => new Movie(movie))
    console.log(movieDataToSend)
    res.status(200).send(movieDataToSend);
  } catch (error) {
    next(error);
  }
};


module.exports = getMovies;
