const axios = require('axios');

class Forecast {
  constructor(day) {
    this.dateTime = day.datetime;
    this.description = day.weather.description;
    this.highTemp = day.high_temp;
    this.lowTemp = day.low_temp;
  }
}

async function getWeather(req, res, next) {
  try {
    let lat = req.query.lat;
    let lon = req.query.lon;
    let weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_API_KEY}&days=5&lat=${lat}&lon=${lon}&units=I`;
    let latLongWeather = await axios.get(weatherURL);
    let weatherDataToSend = latLongWeather.data.data.map(day => new Forecast(day));
    // console.log(dataToSend);
    res.status(200).send(weatherDataToSend);

  } catch (error) {
    next(error);
  }
}

module.exports = getWeather