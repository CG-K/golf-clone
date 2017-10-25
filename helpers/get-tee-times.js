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
function getTeeTimes (options, callback) {
  var url = createTeeTimesURL(options)
  var urlOptions = {
    headers: {
      UserName: process.env.USERNAME,
      Password: process.env.PASSWORD
    }
  }
  // send request
  got(url, urlOptions)
    .then(response => {
      var parsedTeeTimeResponse = JSON.parse(response.body)
      options.TeeTimesResponse = parsedTeeTimeResponse
      console.log(parsedTeeTimeResponse)
      // take parsed response and generate a response for the user
      handleTeeTimesResponse(parsedTeeTimeResponse, function (err, output) {
        if (err) {
          callback(err)
        }
        if (options.maxTeeTimeLength > 1) {
          output = output + 'Do you want to book this tee time or would you like to hear the next one?'
        } else {
          output = output + 'Those are all your options, which option would you like to book?'
        }
        callback(null, output)
      })
    })
    .catch(error => {
      console.log(' we have an error' + error)
      var failGetTeeTimes = 'We failed to get tee times for this course'
      callback(failGetTeeTimes)
    })
}
