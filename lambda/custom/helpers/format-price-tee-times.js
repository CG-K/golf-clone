module.exports = formatPriceTeeTimes

// Purpose: To split up the price for the user output
// param(in): price: price of the tee time Ex (15.34)
// param(out): splitPrice: array of the dollars and cents
// calledBy:  formatTeeTimes
function formatPriceTeeTimes (price) {
  console.log(price)
  var stringPrice = price.toString()
  var splitPrice = stringPrice.split('.')
  console.log(splitPrice)
  return splitPrice
}
