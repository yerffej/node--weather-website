const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiamVmZm1hbmthcCIsImEiOiJjanQwbXR0cTUxZmV0M3lvc2VrZW0zNnduIn0.zTPIJXvUWRjtNN-tBBZvBQ&limit=1'; 
    request({url, json:true}, (error, { body: {features : response}} ) => {
        if (error) {
            callback('Unable to connect to location services', undefined);
        } else if (!response || response && response.length < 1) {
            callback('Unable to find a location. Try another search', undefined);
        } else {
            callback(undefined, {
                latitude: response[0].center[1],
                longitude: response[0].center[0],
                location: response[0].place_name
            });
        }
    });
}

module.exports = geocode;