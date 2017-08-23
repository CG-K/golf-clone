// handle-course-summaries-response.js
// Purpose: To give the user an appropriate response depending on the amount of courses given

module.exports = handleCourseSummariesResponse

const NO_COURSES = 0
// const TOO_MANY_COURSES = 5

var formatCourseSummaries = require('./format-course-summaries.js')

// Purpose: To give the user an appropriate response depending on the amount of courses given
// param(in): response: ApiAiApp object that will prompt the user upon invoking this intent
// param(in): doNotRefine: a Boolean to specify if the user does or does not want to refine results
// param(out): callback: returns the data or error message to getCourseSummaries()
// calledBy: getCourseSummaries()
function handleCourseSummariesResponse (response, doNotRefine, callback) {
  if (response.items.length <= NO_COURSES) {
    // When there are no courses, you need to broaden your search range
    var noCoursesResponse = 'Your Search results did not return any courses. ' +
    'Perhaps look in a different location!'
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

/* else if (response.items.length > TOO_MANY_COURSES && doNotRefine !== true) {
  // When there are more than 5 we want to refine our results
  var tooManyCoursesResponse = 'There are ' + response.items.length + ' courses' +
  'in your search area with available tee times. Would you like to refine your results?'
  callback(null, tooManyCoursesResponse)
} */
