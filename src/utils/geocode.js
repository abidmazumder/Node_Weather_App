const request = require('request');
const geoCode = (adress, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    adress
  )}.json?access_token=pk.eyJ1IjoibXVzdGFraW1rciIsImEiOiJjbDZhdnRpb2wwMTN1M2lzNmhpaWZvNzYwIn0.0bg4CRRjTzQrBa38bWqXSg&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to Connect Location Service', 0);
    } else if (body.features.length === 0) {
      callback('Invalid Location', 0);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};
module.exports = geoCode;
