'use strict';

// http://localhost:3001/weather?lat=30&lon=15&city_name=Amman

// *********** REQUIRE ************************
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const data = require('./data/weather.json');

app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send(`Welcome to my home`);
});
app.get('/hello', (req, res) => {
  console.log(req.query);
  let firstName = req.query.firstName;
  let lastName = req.query.lastName;
});

app.get('/pet', (req, res, next) => {
  try {
    let species = req.query.species;
    console.log(data);
    let dataToGroom = data.find(pet => pet.species === species);
    let dataToSend = new Pet(dataToGroom);
    res.status(200).send(dataToSend);
  } catch(error) {
    next(error);
  }
});

app.get('/weather', (req, res, next) => {
  try {
    // let lat = req.query.lat;
    // let lon = req.query.lon;
    let searchQuery = req.query.city_name;
    let userCity = data.find((cityObj => cityObj.city_name.toLowerCase() === searchQuery.toLowerCase()));
    console.log(userCity);
    let strippedData = userCity.data.map(day => new Forecast(day));
    console.log(strippedData);
    res.status(200).send(strippedData);

  } catch (error) {
    next(error);
  }
});

class Forecast {
  constructor(day) {
    this.dateTime = day.datetime;
    this.description = day.weather.description;
  }
}

app.get('*', (req, res) => {
  res.status(404).send('Sorry you messed that up and have arrived at a page that does not exist. 404');
});

app.use((error, req, res, next) => {
  res.status(500).send(error.message);
}); 
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
