'use strict';
// *** REQUIRES***************************
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weather = require('./modules/newWeather.js');
const getMovies = require('./modules/movies');
const app = express();
// ***** MIDDLEWARE ************************
app.use(cors());
// ********* ENDPOINTS *************************
app.get('/weather', weatherHandler);
app.get('/movies', getMovies);

function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  weather(lat, lon)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Something went wrong!');
    });
}

app.listen(process.env.PORT, () => console.log(`Server up on ${process.env.PORT}`));
