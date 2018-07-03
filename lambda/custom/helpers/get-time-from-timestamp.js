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
  let dateInteger = parseInt(startTimeInfo[2])
  let dateEnding = 'th'
  if (dateInteger === 1 || dateInteger === 21 || dateInteger === 31) {
    dateEnding = 'st'
  } else if (dateInteger === 2 || dateInteger === 22) {
    dateEnding = 'nd'
  } else if (dateInteger === 3 || dateInteger === 23) {
    dateEnding = 'rd'
  }
  let dateString = startTimeInfo[1] + ' ' + dateInteger + dateEnding
  // Reconstruct them
  startTime = startTimeInfo[3] + ' ' + startTimeInfo[4]

  let dateAndTime = {
    time: startTime,
    date: dateString
  }
  return dateAndTime
}
