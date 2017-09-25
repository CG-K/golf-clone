// price-received-intent.js
// Purpose: a function that handles the price recevied intent
module.exports = PriceReceivedIntent

var options = require('../helpers/course-summary-options.json')
var getCourseSummaries = require('../helpers/get-course-summaries.js')
var states = require('../helpers/states.json')

// Purpose: saves the price given by the user and returns course summaries
function PriceReceivedIntent () {
  if (this.event.request.dialogState !== 'COMPLETED') {
    this.emit(':delegate')
  } else {
    this.handler.state = states.PRICEMODE
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
}
