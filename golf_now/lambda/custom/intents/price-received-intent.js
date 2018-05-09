// price-received-intent.js
// Purpose: a function that handles the price recevied intent
module.exports = PriceReceivedIntent

var getCourseSummaries = require('../helpers/get-course-summaries.js')
var states = require('../helpers/states.json')
var getNewState = require('../helpers/get-new-state.js')

// Purpose: saves the price given by the user and returns course summaries
function PriceReceivedIntent () {
  var options = require('../helpers/course-summary-options.json')
  var nextState
  if (this.event.request.intent.slots.amountOfDollars.value === undefined) {
    nextState = getNewState()
    console.log(this.event.request.intent.name)

    console.log('amountOfDollars is undefined.  the next state is: ' + nextState.state)
    this.handler.state = nextState.state
    this.emit(':ask', nextState.response, nextState.reprompt)
  } else {
    options.price = this.event.request.intent.slots.amountOfDollars.value
    nextState = getNewState()
    this.handler.state = nextState.state
    var emit = this.emit
    var handler = this.handler
    if (this.handler.state === states.PRICEMODE) {
      getCourseSummaries(options, function (err, res) {
        if (err) {
          console.log(err)
          emit(':tell', err)
        }
        nextState = getNewState()
        handler.state = nextState.state
        emit(':ask', res)
      })
    } else {
      this.emit(':ask', nextState.response, nextState.reprompt)
    }
  }
}
