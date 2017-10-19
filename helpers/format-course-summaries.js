// format-course-summaries.js
// Purpose: To format the course summaries output for a user to give the top 5 results

module.exports = formatCourseSummaries

const NO_COURSES = 0
const TOO_MANY_COURSES = 5

var getFacilityInfoFromTeeTime = require('./get-facility-info-from-tee-time.js')
var formatPrice = require('./format-price.js')

var date = require('date-and-time')
// Purpose: To format the course summaries output for a user to give the top 5 results
// param(in): response: the string that will prompt the user upon invoking this intent
// param(out): callback: returns the data or error message to getCourseSummaries()
// calledBy: handleCourseSummariesResponse()
function formatCourseSummaries (response, callback) {
  var options = require('./course-summary-options.json')
  var maxResponseLength = NO_COURSES
  if (response.TeeTimes.length >= TOO_MANY_COURSES) {
    // Only want to return top 5 results if more than 5
    maxResponseLength = TOO_MANY_COURSES
  } else if (response.TeeTimes.length < TOO_MANY_COURSES && response.TeeTimes.length > NO_COURSES) {
    maxResponseLength = response.TeeTimes.length
  }
  // var courseOutput = 'Here are your course options: '
  options.courses = []
  for (var i = 0; i < maxResponseLength; i++) {
    // Convert the dates into date objects
    var startDateAndTime = new Date(response.TeeTimes[i].Time)
    // var endDateAndTime = new Date(response.items[i].maxTime)

    // Format them into the format of ' Thursday August 10 11:30 am'
    var dateFormatStartDate = date.format(startDateAndTime, 'dddd MMMM DD hh:mm A')
    // var dateFormatEndDate = date.format(endDateAndTime, 'dddd MMMM DD hh:mm A')

    // split the string up in order to reconstruct it for the response
    var startTimeInfo = dateFormatStartDate.split(' ')
    // var endTimeInfo = dateFormatEndDate.split(' ')

    // Reconstruct them
    var startDate = startTimeInfo[0] + ' ' + startTimeInfo[1] + ' ' + startTimeInfo[2]
    var startTime = startTimeInfo[3] + ' ' + startTimeInfo[4]
    // var endTime = endTimeInfo[3] + ' ' + endTimeInfo[4]

    var nameAndCity = getFacilityInfoFromTeeTime(response.TeeTimes[i].FacilityID, response.Facilities)
    var price = formatPrice(response.TeeTimes[i].DisplayRate.SinglePlayerPrice.TotalDue.Value)
    // Output to User
    var courseOutput = ' Course option ' + (i + 1) + ' ' + nameAndCity.name
    courseOutput = courseOutput + ' in ' + nameAndCity.city
    courseOutput = courseOutput + ' with available tee times on ' + startDate
    courseOutput = courseOutput + ' from ' + startTime + ' that costs '
    // courseOutput = courseOutput + response.items[i].minRate.amount + ' to '
    courseOutput = courseOutput + price[0] + ' dollars and ' + price[1] + ' cents.  '

    console.log(i)
    console.log(maxResponseLength)
    options.maxCoursesLength = maxResponseLength
    options.courses.push(courseOutput)
  }
  callback(null, options.courses[0])
}
