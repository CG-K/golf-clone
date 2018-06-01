// format-course-summaries.js
// Purpose: To format the course summaries output for a user to give the top 5 results

module.exports = formatCourseSummaries

const NO_COURSES = 0
const TOO_MANY_COURSES = 5

// var getFacilityInfoFromTeeTime = require('./get-facility-info-from-tee-time.js')
var formatPriceCourses = require('./format-price-courses.js')

var date = require('date-and-time')
// Purpose: To format the course summaries output for a user to give the top 5 results
// param(in): response: the string that will prompt the user upon invoking this intent
// param(out): callback: returns the data or error message to getCourseSummaries()
// calledBy: handleCourseSummariesResponse()
function formatCourseSummaries (response, sessionAttributes) {
  var maxResponseLength = NO_COURSES
  if (response.Items.length >= TOO_MANY_COURSES) {
    // Only want to return top 5 results if more than 5
    maxResponseLength = TOO_MANY_COURSES
  } else if (response.Items.length < TOO_MANY_COURSES && response.Items.length > NO_COURSES) {
    maxResponseLength = response.Items.length
  }
  // var courseOutput = 'Here are your course options: '
  sessionAttributes['courses'] = []
  for (var i = 0; i < maxResponseLength; i++) {
    // Convert the dates into date objects
    var startDateAndTime = new Date(response.Items[i].MinDate)
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

    // var nameAndCity = getFacilityInfoFromTeeTime(response.TeeTimes[i].FacilityID, response.Facilities)
    var price = formatPriceCourses(response.Items[i].MinPrice, response.Items[i].MaxPrice)
    // Output to User
    var courseOutput = ' Course option ' + (i + 1) + ' ' + response.Items[i].Name
    courseOutput = courseOutput + ' in ' + response.Items[i].Address.City
    courseOutput = courseOutput + ' with available tee times on ' + startDate
    courseOutput = courseOutput + ' from ' + startTime + ' that costs '
    // courseOutput = courseOutput + response.items[i].minRate.amount + ' to '
    if (price.max === null) {
      courseOutput = courseOutput + price.min[0] + ' dollars '
      if (price.min[1] !== undefined) {
        courseOutput = courseOutput + 'and ' + price.min[1] + ' cents.  '
      }
    } else {
      courseOutput = courseOutput + 'from ' + price.min[0] + ' dollars '
      if (price.min[1] !== undefined) {
        courseOutput = courseOutput + 'and ' + price.min[1] + ' cents to  '
      }
      courseOutput = courseOutput + price.max[0] + ' dollars '
      if (price.max[1] !== undefined) {
        courseOutput = courseOutput + 'and ' + price.max[1] + ' cents.'
      }
    }

    console.log(i)
    console.log(maxResponseLength)
    sessionAttributes['maxCoursesLength'] = maxResponseLength
    // if this doesnt work, store the array and then set it equal to it
    sessionAttributes['courses'].push(courseOutput)
  }
  return new Promise ((resolve, reject) => {
    resolve(sessionAttributes['courses'][0])
  })
}
