module.exports = formatPrice

function formatPrice(price) {
  console.log(price)
  var stringPrice = price.toString()
  var splitPrice = stringPrice.split('.')
  console.log(splitPrice)
  return splitPrice
}
