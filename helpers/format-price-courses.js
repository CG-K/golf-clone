module.exports = formatPriceCourses

// Purpose: To split up the price for the user output
// param(in): minPrice: minumum price of the tee time Ex (15.34)
// param(in): maxPrice: maximum price of the tee time Ex (15.34)
// param(out): splitPrice: array of the dollars and cents
// calledBy:  formatCourseSummaries
function formatPriceCourses(minPrice, maxPrice) {
  var price = {
    min: null,
    max: null
  }
  // console.log(price)
  if(minPrice === maxPrice) {
    var minStringPrice = minPrice.toString()
    var minSplitPrice = minStringPrice.split('.')
    price.min = minSplitPrice
  } else {
    var minStringPrice = minPrice.toString()
    var maxStringPrice = maxPrice.toString()
    var minSplitPrice = minStringPrice.split('.')
    var maxSplitPrice = maxStringPrice.split('.')
    price.min = minSplitPrice
    price.max = maxSplitPrice
  }
  return price
}
