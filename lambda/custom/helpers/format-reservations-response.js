module.exports = formatReservationsResponse

const getTimeFromTimeStamp = require('./get-time-from-timestamp.js')

function formatReservationsResponse (parsedReservations, courseName) {
  if (parsedReservations.Reservations.length <= 0) {
    let noReservations = `You have no reservations at this time!`
    return noReservations
  }
  let timeDate = parsedReservations.Reservations[0].Invoice.Time
  let numGolfers = parsedReservations.Reservations[0].Invoice.PlayerCount
  let dateAndTime = getTimeFromTimeStamp(timeDate)

  let message = `You have an upcoming Tee Time at ${courseName} on ${dateAndTime.date} at ${dateAndTime.time}
    with ${numGolfers} golfers.`

  return message
}
