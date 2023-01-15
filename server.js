'use strict';

// http://localhost:3001/weather?lat=30&lon=15&city_name=Amman - Desired URL structure

// *********** REQUIRE ************************
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const data = require('./data/weather.json');
const axios = require('axios');

// *************** CLASSES ***************************
class Forecast {
  constructor(day) {
    this.dateTime = day.datetime;
    this.description = day.weather.description;
    this.highTemp = day.high_temp;
    this.lowTemp = day.low_temp;
  }
}

// ****************** MIDDLEWARE *************************
app.use(cors());

// ********************** ROUTING *****************************

app.get('/', (req, res) => {
  res.status(200).send(`Welcome to my home`);
});

app.get('/weather', async (req, res, next) => {
  try {
    let lat = req.query.lat;
    let lon = req.query.lon;
    let userCity = req.query.city_name;
    let searchURL = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.REACT_APP_WEATHERBIT_API_KEY}&days=5&lat=${lat}&lon=${lon}&units=I`;
    let latLongWeather = await axios.get(searchURL);
    let dataToSend = latLongWeather.data.data.map(day => new Forecast(day));
    console.log(dataToSend);
    res.status(200).send(dataToSend);

  } catch (error) {
    next(error);
  }
});


// ***************** BOILERPLATE ***********************
app.get('*', (req, res) => {
  res.status(404).send('Sorry you messed that up and have arrived at a page that does not exist. 404');
});

app.use((error, req, res, next) => {
  res.status(500).send(error.message);
}); 
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
