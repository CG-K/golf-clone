module.exports = formatPriceCourses

// Purpose: To split up the price for the user output
// param(in): minPrice: minumum price of the tee time Ex (15.34)
// param(in): maxPrice: maximum price of the tee time Ex (15.34)
// param(out): splitPrice: array of the dollars and cents
// calledBy:  formatCourseSummaries
function formatPriceCourses (minPrice, maxPrice) {
  var price = {
    min: null,
    max: null
  }
  var minStringPrice
  var minSplitPrice
  var maxStringPrice
  var maxSplitPrice
  if (minPrice === maxPrice) {
    minStringPrice = minPrice.toString()
    minSplitPrice = minStringPrice.split('.')
    price.min = minSplitPrice
  } else {
    minStringPrice = minPrice.toString()
    maxStringPrice = maxPrice.toString()
    minSplitPrice = minStringPrice.split('.')
    maxSplitPrice = maxStringPrice.split('.')
    price.min = minSplitPrice
    price.max = maxSplitPrice
  }
  return price
}
