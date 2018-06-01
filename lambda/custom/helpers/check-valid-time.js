module.exports = checkValidTime

const START_TIME = '06:00'
const END_TIME = '18:00'

function checkValidTime (time) {
  let isValidTime = false
  if (time >= START_TIME && time <= END_TIME) {
    console.log(time)
    isValidTime = true
  } else {
    isValidTime = false
  }
  console.log(isValidTime)

  return isValidTime
}
