'use strict';
const axios = require('axios');

let cache = require('./newCache.js');

module.exports = getWeather;

function getWeather(latitude, longitude) {
  const key = 'weather-' + latitude + longitude;
  const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHERBIT_API_KEY}&lang=en&lat=${latitude}&lon=${longitude}&days=5&units=I`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
      .then(response => parseWeather(response.data));
  }

  return cache[key].data;
}

function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.data.map(day => {
      return new Forecast(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Forecast {
  constructor(day) {
    this.dateTime = day.datetime;
    this.description = day.weather.description;
    this.highTemp = day.high_temp;
    this.lowTemp = day.low_temp;
  }
}
