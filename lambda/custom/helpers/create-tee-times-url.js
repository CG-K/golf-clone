// create-tee-times-url.js
// Purpose: To create a URL for tee times endpoint
module.exports = createTeeTimesURL

// Purpose: To create a URL for course summaries endpoint
// param(in): options: JSON object that contains all parameters for the GET course summaries endpoint
// param(out): baseURL: returns the formatted URL with all the data for the request
// calledBy: select-course-intent.js

// function createTeeTimesURL (options) {
//   var baseURL = 'https://2-1-17-sandbox.api.gnsvc.com/rest/channel/7886/facilities/' + options.facilityID + '/tee-times?'
//   if (options.date !== null && options.date !== undefined) {
//     baseURL = baseURL + 'date-min=' + options.date + 'T00%3a00%3a00'
//     baseURL = baseURL + '&date-max=' + options.date + 'T23%3a59%3a59'
//   }
//
//   // baseURL = baseURL + '&expand=Facilities'
//   // input default maximum number of records to return = 100
//   baseURL = baseURL + '&take=100'
//   if (options.time !== null && options.time !== undefined) {
//     baseURL = baseURL + '&time-min=' + options.time
//   }
//   if (options.numGolfers !== null && options.numGolfers !== undefined) {
//     baseURL = baseURL + '&players=' + options.numGolfers
//   }
//   if (options.price !== null && options.price !== undefined) {
//     baseURL = baseURL + '&price-max=' + options.price
//   }
//   if (options.dealType === 'hot deal') {
//     baseURL = baseURL + '&trade-only=true'
//   } else {
//     baseURL = baseURL + '&trade-only=false'
//   }
//   console.log(baseURL)
//   return baseURL
// }

function createTeeTimesURL (sessionAttributes) {
  var baseURL = 'https://2-1-17-sandbox.api.gnsvc.com/rest/channel/7886/facilities/' + sessionAttributes['facilityID'] + '/tee-times?'
  if (sessionAttributes['date'] !== null && sessionAttributes['date'] !== undefined) {
    baseURL = baseURL + 'date-min=' + sessionAttributes['date'] + 'T00%3a00%3a00'
    baseURL = baseURL + '&date-max=' + sessionAttributes['date'] + 'T23%3a59%3a59'
  }

  // baseURL = baseURL + '&expand=Facilities'
  // input default maximum number of records to return = 100
  baseURL = baseURL + '&take=100'
  if (sessionAttributes['time'] !== null && sessionAttributes['time'] !== undefined) {
    baseURL = baseURL + '&time-min=' + sessionAttributes['time']
  }
  if (sessionAttributes['numGolfers'] !== null && sessionAttributes['numGolfers'] !== undefined) {
    baseURL = baseURL + '&players=' + sessionAttributes['numGolfers']
  }
  if (sessionAttributes['price'] !== null && sessionAttributes['price'] !== undefined) {
    baseURL = baseURL + '&price-max=' + sessionAttributes['price']
  }
  if (sessionAttributes['dealType'] === 'hot deal') {
    baseURL = baseURL + '&trade-only=true'
  } else {
    baseURL = baseURL + '&trade-only=false'
  }
  console.log(baseURL)
  return baseURL
}
