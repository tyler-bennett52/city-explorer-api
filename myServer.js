'use strict';

// *********** REQUIRE ************************
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const getWeather = require('./modules/weather');
const getMovies = require('./modules/movies');

// ****************** MIDDLEWARE *************************
app.use(cors());

// ********************** ROUTING *****************************
app.get('/', (req, res) => {
  res.status(200).send('Welcome to my home');
});

app.get('/weather', getWeather);

app.get('/movies', getMovies);

// ***************** BOILERPLATE ***********************
app.get('*', (req, res) => {
  res.status(404).send('Sorry you messed that up and have arrived at a page that does not exist. 404');
});

app.use((error, req, res, next) => {
  console.log(error)
  res.status(500).send(error.message);
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
