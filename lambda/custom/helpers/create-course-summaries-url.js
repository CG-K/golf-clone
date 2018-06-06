// create-course-summaries-url.js
// Purpose: To create a URL for course summaries endpoint
module.exports = createCourseSummariesURL

// Purpose: To create a URL for course summaries endpoint
// param(in): options: JSON object that contains all parameters for the GET course summaries endpoint
// param(out): baseURL: returns the formatted URL with all the data for the request
// calledBy: getCourseSummaries()

function createCourseSummariesURL (sessionAttributes) {
  console.log('in createCourseSummariesURL')
  var baseURL = 'https://2-1-17-sandbox.api.gnsvc.com/rest/channel/7886/facility-summaries?q=geolocation&latitude=' + sessionAttributes['latitude'] + '&longitude=' + sessionAttributes['longitude'] + '&proximity=25'
  if (sessionAttributes['date'] !== null && sessionAttributes['date'] !== undefined) {
    baseURL = baseURL + '&date-min=' + sessionAttributes['date'] + 'T00%3a00%3a00'
    baseURL = baseURL + '&date-max=' + sessionAttributes['date'] + 'T23%3a59%3a59'
  }

  baseURL = baseURL + '&expand=Facilities'
  // input default maximum number of records to return = 100
  baseURL = baseURL + '&take=100'
  if (sessionAttributes['time'] !== null && sessionAttributes['time'] !== undefined && sessionAttributes['time'] !== 'any') {
    baseURL = baseURL + '&time-min=' + sessionAttributes['time']
  }
  if (sessionAttributes['numGolfers'] !== null && sessionAttributes['numGolfers'] !== undefined && sessionAttributes['numGolfers'] !== 'any') {
    baseURL = baseURL + '&players=' + sessionAttributes['numGolfers']
  }
  if (sessionAttributes['price'] !== null && sessionAttributes['price'] !== undefined && sessionAttributes['price'] !== 'any') {
    baseURL = baseURL + '&price-max=' + sessionAttributes['price']
  }
  // default number of holes
  baseURL = baseURL + '&holes=18'
  //sort by distance
  baseURL = baseURL + '&sort-by=Facilities.Distance'
  if (sessionAttributes['dealType'] === 'hot deal') {
    baseURL = baseURL + '&trade-only=true'
  } else {
    baseURL = baseURL + '&trade-only=false'
  }
  console.log(baseURL)
  return baseURL
}
