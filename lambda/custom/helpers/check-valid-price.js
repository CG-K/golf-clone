module.exports = checkValidPrice

// Check if the price is valid meaning above 10
const MIN_PRICE = 10

function checkValidPrice (price) {
  let isValidPrice = false
  if (price <= MIN_PRICE) {
    isValidPrice = false
  } else {
    isValidPrice = true
  }
  return isValidPrice
}
