// handle-tee-times-response.js
// Purpose: To give the user an appropriate response depending on the amount of tee times given

module.exports = handleTeeTimesResponse

const NO_COURSES = 0

var formatTeeTimes = require('./format-tee-times.js')

// Purpose: To give the user an appropriate response depending on the amount of courses given
// param(in): response: ApiAiApp object that will prompt the user upon invoking this intent
// param(in): doNotRefine: a Boolean to specify if the user does or does not want to refine results
// param(out): callback: returns the data or error message to getCourseSummaries()
// calledBy: getTeeTimes()
async function handleTeeTimesResponse (response, sessionAttributes) {
  if (response.TeeTimes.length <= NO_COURSES) {
    // When there are no courses, you need to broaden your search range
    var noTeeTimesResponse = 'Your Search results did not return any tee times. '
    return new Promise((resolve, reject) => {
      resolve(noTeeTimesResponse)
    })
  } else {
    // Give the user the tee time options
    try {
      let res = await formatTeeTimes(response, sessionAttributes)
      return new Promise((resolve, reject) => {
        resolve(res)
      })
    } catch(err) {
      return new Promise((resolve, reject) => {
        reject(err)
      })
    }
  }
}
