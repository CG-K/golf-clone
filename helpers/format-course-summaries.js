// format-course-summaries.js
// Purpose: To format the course summaries output for a user to give the top 5 results

module.exports = formatCourseSummaries

const NO_COURSES = 0
const TOO_MANY_COURSES = 5

var date = require('date-and-time')
// Purpose: To format the course summaries output for a user to give the top 5 results
// param(in): response: ApiAiApp object that will prompt the user upon invoking this intent
// param(in): doNotRefine: a Boolean to specify if the user does or does not want to refine results
// param(out): callback: returns the data or error message to getCourseSummaries()
// calledBy: getCourseSummaries()
function formatCourseSummaries (response, callback) {
  var maxResponseLength = NO_COURSES
  if (response.items.length >= TOO_MANY_COURSES) {
    // Only want to return top 5 results if more than 5
    maxResponseLength = TOO_MANY_COURSES
  } else if (response.items.length < TOO_MANY_COURSES && response.items.length > NO_COURSES) {
    maxResponseLength = response.items.length
  }
  var courseOutput = 'Here are your course options: '
  for (var i = 0; i < maxResponseLength; i++) {
    // Convert the dates into date objects
    var startDateAndTime = new Date(response.items[i].minTime)
    var endDateAndTime = new Date(response.items[i].maxTime)

    // Format them into the format of ' Thursday August 10 11:30 am'
    var dateFormatStartDate = date.format(startDateAndTime, 'dddd MMMM DD hh:mm A')
    var dateFormatEndDate = date.format(endDateAndTime, 'dddd MMMM DD hh:mm A')

    // split the string up in order to reconstruct it for the response
    var startTimeInfo = dateFormatStartDate.split(' ')
    var endTimeInfo = dateFormatEndDate.split(' ')

    // Reconstruct them
    var startDate = startTimeInfo[0] + ' ' + startTimeInfo[1] + ' ' + startTimeInfo[2]
    var startTime = startTimeInfo[3] + ' ' + startTimeInfo[4]
    var endTime = endTimeInfo[3] + ' ' + endTimeInfo[4]

    // Output to User
    courseOutput = courseOutput + ' Course option ' + (i + 1) + ' ' + response.items[i].name
    courseOutput = courseOutput + ' in ' + response.items[i].address.city
    courseOutput = courseOutput + ' with available tee times on ' + startDate
    courseOutput = courseOutput + ' from ' + startTime + ' to '
    courseOutput = courseOutput + endTime + ' that cost from '
    courseOutput = courseOutput + response.items[i].minRate.amount + ' to '
    courseOutput = courseOutput + response.items[i].maxRate.amount + ' dollars.    '
  }
  callback(null, courseOutput)
}
