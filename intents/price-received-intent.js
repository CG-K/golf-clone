module.exports = PriceReceivedIntent

var options = require('../helpers/course-summary-options.json')
var getCourseSummaries = require('../helpers/get-course-summaries.js')

function PriceReceivedIntent () {
  options.price = this.event.request.intent.slots.amountOfDollars.value
  var emit = this.emit
  getCourseSummaries(options, function (err, res) {
    if (err) {
      console.log(err)
      emit(':tell', err)
    }
    console.log(res)
    emit(':ask', res)
  })
}
