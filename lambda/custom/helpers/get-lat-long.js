// get-lat-long.js
// Purpose: To get latitude and longitude coordinates from either city or zipcode

module.exports = getLatLong

// set path to the .env file for env variables
require('dotenv').config({path: '../'})
var getNewState = require('./get-new-state.js')
var states = require('./states.json')
var getCourseSummaries = require('./get-course-summaries.js')

async function getLatLong (location, sessionAttributes) {
  var NodeGeocoder = require('node-geocoder')
  var options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: process.env.GMAPS_KEY,
    formatter: null
  }
  var geocoder = NodeGeocoder(options)

  try {
    let res = await geocoder.geocode(location)
    var latitude = res[0].latitude
    var longitude = res[0].longitude
    sessionAttributes['latitude'] = latitude
    sessionAttributes['longitude'] = longitude
    console.log('session attributes right before sent to getNewState', JSON.stringify(sessionAttributes))
    var stateResponse = getNewState(sessionAttributes)
    sessionAttributes['STATE'] = stateResponse.state
    var response = {
      state: stateResponse.state,
      latLongOutput: stateResponse.response,
      latLongReprompt: stateResponse.reprompt,
      sessionAttributes: sessionAttributes
    }
    if (response.state === states.PRICEMODE) {
      try {
        let output = await getCourseSummaries(sessionAttributes)
        response.latLongOutput = output
        return new Promise((resolve, reject) => {
          resolve(response)
        })
      } catch (err) {
        response.latLongOutput = err
        return new Promise((resolve, reject) => {
          reject(response)
        })
      }
    } else {
      return new Promise ((resolve, reject) => {
        console.log('response right before sent back to book-time')
        console.log(response)
        resolve(response)
      })
    }
  } catch(err) {
    var failGeocode = 'We have failed to get the latitude and longitude from ' +
    'the given location, can you try again?'
    return new Promise ((resolve, reject) => {
      reject(failGeocode)
    })
  }
  // geocoder.geocode(location)
  //   .then((res) => {
  //     var latitude = res[0].latitude
  //     var longitude = res[0].longitude
  //     sessionAttributes['latitude'] = latitude
  //     sessionAttributes['longitude'] = longitude
  //     console.log('session attributes right before sent to getNewState', JSON.stringify(sessionAttributes))
  //     var stateResponse = getNewState(sessionAttributes)
  //     var response = {
  //       state: stateResponse.state,
  //       latLongOutput: stateResponse.response,
  //       latLongReprompt: stateResponse.reprompt,
  //       sessionAttributes: sessionAttributes
  //     }
  //     return new Promise ((resolve, reject) => {
  //       console.log('response right before sent back to book-time')
  //       console.log(response)
  //       resolve(response)
  //     })
  //   })
  //   .catch((err) => {
  //     var failGeocode = 'We have failed to get the latitude and longitude from ' +
  //     'the given location, can you try again?'
  //     return new Promise ((resolve, reject) => {
  //       reject(failGeocode)
  //     })
  //   })
}
