module.exports = checkValidGolfers

const MAX_GOLFERS = 3
const NO_GOLFERS = 0

function checkValidGolfers (numGolfers) {
  let isValidGolfers = false
  if (numGolfers > MAX_GOLFERS || numGolfers < NO_GOLFERS) {
    isValidGolfers = false
  } else {
    isValidGolfers = true
  }
  return isValidGolfers
}
