// get-course-summaries.js
// Purpose: To hit Golf Now API for course summaries with a given location
module.exports = getCourseSummaries

const got = require('got')

var createAuthToken = require('../create-auth-token.js')
var handleCourseSummariesResponse = require('./handle-course-summaries-response.js')
var createCourseSummariesURL = require('./create-course-summaries-url.js')

// Purpose: To hit Golf Now API for course summaries with a given location
// param(in): latitude: The latitude of the search location for the query
// param(in): longitude: The longitude of the search location for the query
// param(out): callback: returns the data or error message to who called it
// calledBy: getLocationNearMeIntent(), getLocationIntent(), datesReceivedIntent()
//  timeReceivedIntent(), numGolfersReceivedIntent(), priceReceivedIntent, doNotRefineIntent()
function getCourseSummaries (options, callback) {
  var url = createCourseSummariesURL(options)
  var token = createAuthToken()
  token = 'Basic ' + token
  var urlOptions = {
    headers: {
      Authorization: token
    }
  }
  console.log(urlOptions)
  // send request
  got(url, urlOptions)
    .then(response => {
      var parsedCourseResponse = JSON.parse(response.body)
      // take parsed response and generate a response for the user
      handleCourseSummariesResponse(parsedCourseResponse, options.doNotRefine, function (err, output) {
        if (err) {
          callback(err)
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
