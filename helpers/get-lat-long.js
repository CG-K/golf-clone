// get-lat-long.js
// Purpose: To get latitude and longitude coordinates from either city or zipcode

module.exports = getLatLong

// set path to the .env file for env variables
require('dotenv').config({path: '../'})
var getNewState = require('./get-new-state.js')
var states = require('./states.json')
var getCourseSummaries = require('./get-course-summaries.js')


// Purpose: To get latitude and longitude coordinates from either city or zipcode
// param(in): location: Either the city or zipcode that was said by the user to book a tee time with
// param(out): callback: returns the data or error message to GetLocation()
// calledBy: GetLocation()
function getLatLong (location, callback) {
  console.log(location)
  var NodeGeocoder = require('node-geocoder')
  var options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: process.env.GMAPS_KEY,
    formatter: null
  }
  var geocoder = NodeGeocoder(options)

  geocoder.geocode(location, function (err, res) {
    console.log('we are in the geocoding')
    if (err) {
      callback(null, 'hi we are in the error')
      console.log(err)
      var failGeocode = 'We have failed to get the latitude and longitude from ' +
      'the given location, can you try again?'
      callback(failGeocode)
    }
    console.log(res[0])
    var options = require('./course-summary-options.json')
    var latitude = res[0].latitude
    var longitude = res[0].longitude
    options.latitude = latitude
    options.longitude = longitude
    var stateResponse = getNewState()
    var response = {
      state: stateResponse.state,
      latLongOutput: stateResponse.response,
      latLongReprompt: stateResponse.reprompt,
    }
    console.log('state: ' + response.state)
    if (response.state === states.PRICEMODE) {
      getCourseSummaries(options, function (err, output) {
        if (err) {
          console.log(err)
          response.latLongOutput = err
          callback(response)
        }
        console.log(output)
        response.latLongOutput = output
        callback(null, response)
      })
    } else {
      callback(null, response)
    }
    // response.latLongOutput = 'What day would you like to play?'
    // response.latLongReprompt = 'Tell me what day you would like to play, you can say things like today, tomorrow, Next Tuesday.'
    // callback(null, response)
  })
}
