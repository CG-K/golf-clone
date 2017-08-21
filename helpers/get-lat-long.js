// get-lat-long.js
// Purpose: To get latitude and longitude coordinates from either city or zipcode

module.exports = getLatLong

// var getCourseSummaries = require('./get-course-summaries.js')

// set path to the .env file for env variables
require('dotenv').config({path: '../'})
var courseSummaryOptions = require('./course-summary-options.json')

// Purpose: To get latitude and longitude coordinates from either city or zipcode
// param(in): location: Either the city or zipcode that was said by the user to book a tee time with
// param(out): callback: returns the data or error message to GetLocation()
// calledBy: GetLocation()
function getLatLong (location, callback) {
  var NodeGeocoder = require('node-geocoder')
  var options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: process.env.GMAPS_KEY,
    formatter: null
  }
  var geocoder = NodeGeocoder(options)

  geocoder.geocode(location, function (err, res) {
    if (err) {
      console.log(err)
      var failGeocode = 'We have failed to get the latitude and longitude from ' +
      'the given location, can you try again?'
      callback(failGeocode)
    }
    var latitude = res[0].latitude
    var longitude = res[0].longitude
    courseSummaryOptions.latitude = latitude
    courseSummaryOptions.longitude = longitude
    var latLongOutput = 'What day would you like to play?'
    callback(null, latLongOutput)
    /* getCourseSummaries(courseSummaryOptions, function (err, courses) {
      if (err) {
        var failCourseSum = 'we have failed to get the course summaries, can \
         you try again?'
        callback(failCourseSum)
      }
      console.log('courses: ' + courses)
      callback(null, courses)
    }) */
  })
}
