// create-course-summaries-url.js
// Purpose: To create a URL for course summaries endpoint
module.exports = createCourseSummariesURL

// Purpose: To create a URL for course summaries endpoint
// param(in): options: JSON object that contains all parameters for the GET course summaries endpoint
// param(out): baseURL: returns the formatted URL with all the data for the request
// calledBy: getCourseSummaries()
function createCourseSummariesURL (options) {
  console.log('options:' + options )
  var baseURL = 'https://affiliate.gnsvc.com/api/v1/channels/7886/course-summaries?latitude=' + options.latitude + '&longitude=' + options.longitude
  if (options.date !== null && options.date !== undefined) {
    baseURL = baseURL + '&search-date=' + options.date
  }
  if (options.time !== null && options.time !== undefined) {
    baseURL = baseURL + '&start-time=' + options.time
  }
  if (options.numGolfers !== null && options.numGolfers !== undefined) {
    baseURL = baseURL + '&player-count=' + options.numGolfers
  }
  if (options.price !== null && options.price !== undefined) {
    baseURL = baseURL + '&end-price=' + options.price
  }
  console.log(baseURL)
  return baseURL
}
