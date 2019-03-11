const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/563d4b2d2df603948e6084cead1815da/${latitude},${longitude}?units=us`;

    request({url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Unable to reach weather service');
        } else if (body.error) {
            callback(body.error);
        } else {
            const summary = body.daily.data[0].summary,
                temperature = body.currently.temperature,
                precipProbability = body.currently.precipProbability * 100,
                forecastString = `${summary} It is currently ${temperature} degrees F out. There is a ${precipProbability} percent chance of rain.`;

            callback(undefined, forecastString);
        }
    });
}

module.exports = forecast;