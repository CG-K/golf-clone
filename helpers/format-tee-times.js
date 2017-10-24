// format-tee-times.js
// Purpose: To format the tee times output for a user to give the top 5 results

module.exports = formatTeeTimes

const NO_TEE_TIMES = 0
const TOO_MANY_TEE_TIMES = 5

// var getFacilityInfoFromTeeTime = require('./get-facility-info-from-tee-time.js')
var formatPriceTeeTimes = require('./format-price-tee-times.js')

var date = require('date-and-time')
// Purpose: To format the course summaries output for a user to give the top 5 results
// param(in): response: the string that will prompt the user upon invoking this intent
// param(out): callback: returns the data or error message to getCourseSummaries()
// calledBy: handleCourseSummariesResponse()
function formatTeeTimes (response, callback) {
  var options = require('./course-summary-options.json')
  var maxResponseLength = NO_TEE_TIMES
  if (response.TeeTimes.length >= TOO_MANY_TEE_TIMES) {
    // Only want to return top 5 results if more than 5
    maxResponseLength = TOO_MANY_TEE_TIMES
  } else if (response.TeeTimes.length < TOO_MANY_TEE_TIMES && response.TeeTimes.length > NO_TEE_TIMES) {
    maxResponseLength = response.TeeTimes.length
  }
  // var courseOutput = 'Here are your course options: '
  options.teeTimes = []
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

    // var nameAndCity = getFacilityInfoFromTeeTime(response.TeeTimes[i].FacilityID, response.Facilities)
    var price = formatPriceTeeTimes(response.TeeTimes[i].DisplayRate.SinglePlayerPrice.TotalDue.Value)
    // Output to User
    var teeTimeOutput = ' Tee Time option ' + (i + 1) + ' is at '
    teeTimeOutput = teeTimeOutput + startTime + ' for '
    teeTimeOutput = teeTimeOutput + price[0] + ' dollars and ' + price[1] + ' cents.  '
    // teeTimeOutput = teeTimeOutput + ' with available tee times on ' + startDate
    // teeTimeOutput = teeTimeOutput + ' from ' + startTime + ' that costs '
    // courseOutput = courseOutput + response.items[i].minRate.amount + ' to '

    console.log(i)
    console.log(maxResponseLength)
    options.maxTeeTimeLength = maxResponseLength
    options.teeTimes.push(teeTimeOutput)
  }
  callback(null, options.teeTimes[0])
}
