// get-course-summaries.js
// Purpose: To hit Golf Now API for course summaries with a given location
module.exports = getTeeTimes

const got = require('got')

var createTeeTimesURL = require('./create-tee-times-url.js')
var handleTeeTimesResponse = require('./handle-tee-times-response.js')

// Purpose: To hit Golf Now API for course summaries with a given location
// param(in): options: course-summary-options.json file containing the options the user has selected
// param(out): callback: returns the data or error message to who called it
// calledBy:  priceReceivedIntent

async function getTeeTimes (sessionAttributes) {
  var url = createTeeTimesURL(sessionAttributes)
  var urlOptions = {
    headers: {
      UserName: process.env.USERNAME,
      Password: process.env.PASSWORD
    }
  }
  // send request
  try {
    let response = await got(url, urlOptions)
    var parsedTeeTimeResponse = JSON.parse(response.body)
    console.log(parsedTeeTimeResponse)
    let teeTimes = []
    // reduce the size of the response
    for (var i = 0; i < parsedTeeTimeResponse.TeeTimes.length; i++) {
      let teeTimeObject = {
        TeeTimeRateID: parsedTeeTimeResponse.TeeTimes[i].DisplayRate.TeeTimeRateID
      }
      teeTimes.push(teeTimeObject)
    }
    sessionAttributes['TeeTimesResponse'] = teeTimes
    console.log(parsedTeeTimeResponse)
    try {
      let output = await handleTeeTimesResponse(parsedTeeTimeResponse, sessionAttributes)
      if (sessionAttributes['maxTeeTimeLength'] > 1) {
        output = output + 'Do you want to book this tee time or would you like to hear the next one?'
      } else {
        output = output + 'Those are all your options, which option would you like to book?'
      }
      return new Promise((resolve, reject) => {
        resolve(output)
      })
    } catch(err) {
      return new Promise((resolve, reject) => {
        reject(err)
      })
    }
  } catch(error) {
    console.log(' we have an error' + error)
    var failGetTeeTimes = 'We failed to get tee times for this course'
    return new Promise((resolve, reject) => {
      reject(error)
    })
  }
}
