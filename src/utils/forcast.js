const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=865b2bcccb7994763de4c450225bfd62&query=${latitude},${longitude}&units=m`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service', 0);
    } else if (body.error) {
      callback('unable to connect weather service', 0);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out feels like ${body.current.feelslike} out ,` +
          `<br> UV Index: ${body.current.uv_index} <br>
          Humidity:${body.current.humidity}
          `
      );
    }
  });
};
module.exports = forecast;
