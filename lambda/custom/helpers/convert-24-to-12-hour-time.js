module.exports = convert24to12HourTime

const HOURS_INDEX = 0
const MINUTES_INDEX = 1
const NOON = 12
const base = 10

//Convert the time received from alexa to an convert to 12 hour based time
function convert24to12HourTime (time) {
  let twelveHourTime = ''
  let hoursAndMinutes = time.split(':')
  if (parseInt(hoursAndMinutes[HOURS_INDEX], base) > NOON) {
     hoursAndMinutes[HOURS_INDEX] = parseInt(hoursAndMinutes[HOURS_INDEX], base) - NOON
     twelveHourTime = hoursAndMinutes[HOURS_INDEX] + ':' + hoursAndMinutes[MINUTES_INDEX] + ' P.M.'
  } else if (parseInt(hoursAndMinutes[HOURS_INDEX], base) === NOON) {
    twelveHourTime = hoursAndMinutes[HOURS_INDEX] + ':' + hoursAndMinutes[MINUTES_INDEX] + ' P.M.'
  } else {
    twelveHourTime = hoursAndMinutes[HOURS_INDEX] + ':' + hoursAndMinutes[MINUTES_INDEX] + ' A.M.'
  }
  twelveHourTime = 'at ' + twelveHourTime 
  return twelveHourTime
}
