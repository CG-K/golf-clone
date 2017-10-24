// handle-tee-times-response.js
// Purpose: To give the user an appropriate response depending on the amount of tee times given

module.exports = handleTeeTimesResponse

const NO_COURSES = 0
const TOO_MANY_COURSES = 5

var formatTeeTimes = require('./format-tee-times.js')

// Purpose: To give the user an appropriate response depending on the amount of courses given
// param(in): response: ApiAiApp object that will prompt the user upon invoking this intent
// param(in): doNotRefine: a Boolean to specify if the user does or does not want to refine results
// param(out): callback: returns the data or error message to getCourseSummaries()
// calledBy: getTeeTimes()
function handleTeeTimesResponse (response, callback) {
  var maxResponseLength = 0
  console.log(response)
  if (response.TeeTimes.length <= NO_COURSES) {
    // When there are no courses, you need to broaden your search range
    var noTeeTimesResponse = 'Your Search results did not return any tee times. '
    callback(null, noTeeTimesResponse)
  } else {
    // Give the user the tee time options
    formatTeeTimes(response, function (err, res) {
      if (err) {
        callback(err)
      }
      callback(null, res)
    })
  }
}
