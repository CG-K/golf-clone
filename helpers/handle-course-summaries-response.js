// handle-course-summaries-response.js
// Purpose: To give the user an appropriate response depending on the amount of courses given

module.exports = handleCourseSummariesResponse

const NO_COURSES = 0

var formatCourseSummaries = require('./format-course-summaries.js')

// Purpose: To give the user an appropriate response depending on the amount of courses given
// param(in): response: ApiAiApp object that will prompt the user upon invoking this intent
// param(in): doNotRefine: a Boolean to specify if the user does or does not want to refine results
// param(out): callback: returns the data or error message to getCourseSummaries()
// calledBy: getCourseSummaries()

function handleCourseSummariesResponse (response, callback) {
  if (response.Items.length <= NO_COURSES) {
    // When there are no courses, you need to broaden your search range
    var noCoursesResponse = 'Your Search results did not return any courses. ' +
    'Perhaps look on a different day, in another location, or at another time!'
    callback(null, noCoursesResponse)
  } else {
    // Give the user the course options
    formatCourseSummaries(response, function (err, res) {
      if (err) {
        callback(err)
      }
      callback(null, res)
    })
  }
}
