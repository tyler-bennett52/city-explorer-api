'use strict';

// http://localhost:3001/weather?lat=30&lon=15&city_name=Amman

// *********** REQUIRE ************************
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const data = require('./data/weather.json');
// const { response } = require('express');

app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send(`Welcome to my home`);
});
app.get('/hello', (req, res) => {
  console.log(req.query);
  let firstName = req.query.firstName;
  let lastName = req.query.lastName;
  res.status(200).send(`Hello ${firstName} ${lastName}, welcome to my home`);
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
    let lat = req.query.lat;
    let lon = req.query.lon;
    let searchQuery = req.query.city_name;
    let userCity = data.find((cityObj => cityObj.city_name === searchQuery));
    // console.log(userCity);
    // console.log(data);
    let strippedData = new Forecast(userCity, lat, lon);
    console.log(strippedData);
    res.status(200).send(strippedData);

  } catch (error) {
    next(error);
  }
});

class Forecast {
  constructor(cityObj, lat, lon) {
    this.dateTimeOne = cityObj.data[0].datetime;
    this.descriptionOne = cityObj.data[0].weather.description;
    this.dateTimeTwo = cityObj.data[1].datetime;
    this.descriptionTwo = cityObj.data[1].weather.description;
    this.dateTimeThree = cityObj.data[2].datetime;
    this.descriptionThree = cityObj.data[2].weather.description;
    this.lat = lat;
    this.lon = lon;
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
