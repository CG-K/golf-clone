// get-course-summaries.js
// Purpose: To hit Golf Now API for course summaries with a given location
module.exports = getCourseSummaries

const got = require('got')

// var createAuthToken = require('../create-auth-token.js')
var handleCourseSummariesResponse = require('./handle-course-summaries-response.js')
var createCourseSummariesURL = require('./create-course-summaries-url.js')

// Purpose: To hit Golf Now API for course summaries with a given location
// param(in): options: course-summary-options.json file containing the options the user has selected
// param(out): callback: returns the data or error message to who called it
// calledBy:  priceReceivedIntent
function getCourseSummaries (options, callback) {
  var url = createCourseSummariesURL(options)
  var urlOptions = {
    headers: {
      UserName: process.env.USERNAME,
      Password: process.env.PASSWORD
    }
  }
  console.log(urlOptions)
  // send request
  got(url, urlOptions)
    .then(response => {
      var parsedCourseResponse = JSON.parse(response.body)
      // callback(null, 'we got the data')
      // take parsed response and generate a response for the user
      handleCourseSummariesResponse(parsedCourseResponse, function (err, output) {
        if (err) {
          callback(err)
        }
        if (options.maxCoursesLength > 1){
          output = output + 'Do you want to book a tee time here or would you like to hear the next one?'
        } else {
          output = output + 'Those are all your options, which option would you like to book?'
        }
        callback(null, output)
      })
    })
    .catch(error => {
      console.log(' we have an error' + error)
      var failGetCourseSum = 'We failed to get course summaries'
      callback(failGetCourseSum)
    })
}
