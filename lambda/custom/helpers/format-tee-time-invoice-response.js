module.exports = formatTeeTimeInvoiceResponse

const getTimeFromTimeStamp = require('./get-time-from-timestamp.js')
const formatPriceTeeTimes = require('./format-price-tee-times.js')

// to return an invoice statement for the user
function formatTeeTimeInvoiceResponse (teeTimeInvoiceResponse, sessionAttributes) {
  let totalPrice
  let dueOnline
  let dueAtCourse
  let invoiceResponse = ''

  if (teeTimeInvoiceResponse.Pricing.DueAtCourse.Value !== undefined && teeTimeInvoiceResponse.Pricing.DueOnline.Value !== undefined && teeTimeInvoiceResponse.Pricing.TotalDue.Value !== undefined) {
    dueAtCourse = teeTimeInvoiceResponse.Pricing.DueAtCourse.Value
    dueOnline = teeTimeInvoiceResponse.Pricing.DueOnline.Value
    totalPrice = teeTimeInvoiceResponse.Pricing.TotalDue.Value
  } else {
    let noMoneyInfo = `We failed to get final pricing information for this tee time!`
    return noMoneyInfo
  }
  let startTime = getTimeFromTimeStamp(teeTimeInvoiceResponse.Time)
  let dueOnlineParts = formatPriceTeeTimes(dueOnline)
  let dueAtCourseParts = formatPriceTeeTimes(dueAtCourse)
  let totalPriceParts = formatPriceTeeTimes(totalPrice)

  invoiceResponse = `Ok, you have selected ${sessionAttributes['courseName']} on ${sessionAttributes['date']} at ${startTime}
    with ${sessionAttributes['numGolfers']} golfers.  Your total is ${totalPriceParts[0]} dollars and ${totalPriceParts[1]} cents.
    You will be charged now for ${dueOnlineParts[0]} dollars and ${dueOnlineParts[1]} cents and
    will be charged ${dueAtCourseParts[0]} dollars and ${dueAtCourseParts[1]} cents at the course.
    Do you want to book this tee time? If yes I will charge your preferred payment
    method associated with your Golf Now Account.`

  return invoiceResponse
}
