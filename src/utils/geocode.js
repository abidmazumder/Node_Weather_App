const request = require('request');
const geoCode = (adress, callback) => {
  const url = `https://api.positionstack.com/v1/forward?access_key=dc6a574c7180cdf17c9c992c643695af&query=${encodeURIComponent(
    adress
  )}`;

  console.log(url);

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to Connect Location Service', 0);
    } else if (body.data.length === 0) {
      callback('Invalid Location', 0);
    } else {
      callback(undefined, {
        latitude: body.data[0].latitude,
        longitude: body.data[0].longitude,
        location: body.data[0].name,
      });
    }
  });
};
module.exports = geoCode;
