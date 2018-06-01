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
// async function getLatLong (location, sessionAttributes) {
//   let promise =  new Promise((resolve, reject) => {
//     getLatLongCallback(location, sessionAttributes, resolve)
//   })
//   let result = await promise
//   console.log('result: ', result)
// }
//
// function getLatLongCallback (location, sessionAttributes, callback) {
//   var NodeGeocoder = require('node-geocoder')
//   var options = {
//     provider: 'google',
//     httpAdapter: 'https',
//     apiKey: process.env.GMAPS_KEY,
//     formatter: null
//   }
//   var geocoder = NodeGeocoder(options)
//
//   geocoder.geocode(location, function (err, res) {
//     console.log('we are in the geocoding')
//     if (err) {
//       console.log(err)
//       var failGeocode = 'We have failed to get the latitude and longitude from ' +
//       'the given location, can you try again?'
//       callback(failGeocode)
//       return
//     }
//     console.log(res[0])
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
//     console.log('response attributes: ' + JSON.stringify(response.sessionAttributes))
//     if (response.state === states.PRICEMODE) {
//       getCourseSummaries(options, function (err, output) {
//         if (err) {
//           console.log(err)
//           response.latLongOutput = err
//           callback(response)
//           return
//         }
//         console.log(output)
//         response.latLongOutput = output
//         callback(null, response)
//         return
//       })
//     } else {
//       console.log('response right before sent back to book-time')
//       console.log(response)
//       callback(null, response)
//       return
//     }
//     // response.latLongOutput = 'What day would you like to play?'
//     // response.latLongReprompt = 'Tell me what day you would like to play, you can say things like today, tomorrow, Next Tuesday.'
//     // callback(null, response)
//   })
// }


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
