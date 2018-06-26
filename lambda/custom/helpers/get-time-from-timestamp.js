module.exports = getTimeFromTimeStamp

var date = require('date-and-time')

function getTimeFromTimeStamp (time) {
  let startTime
  // Convert the dates into date objects
  let startDateAndTime = new Date(time)

  // Format them into the format of ' Thursday August 10 11:30 am'
  let dateFormatStartDate = date.format(startDateAndTime, 'dddd MMMM DD hh:mm A')

  // split the string up in order to reconstruct it for the response
  let startTimeInfo = dateFormatStartDate.split(' ')

  // Reconstruct them
  startTime = startTimeInfo[3] + ' ' + startTimeInfo[4]
  return startTime
}
