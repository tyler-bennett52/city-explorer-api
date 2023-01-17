'use strict';

// *********** REQUIRE ************************
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const data = require('./data/weather.json');
// const { response } = require('express');

app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send(`${req}`);
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
    res.status(200).send(`${lat}, ${lon}`);

  } catch (error) {
    next(error);
  }
});

class Pet {
  constructor(petObj) {
    this.name = petObj.name,
    this.breed = petObj.breed;
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
