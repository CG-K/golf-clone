// price-received-intent.js
// Purpose: a function that handles the price recevied intent
module.exports = PriceReceivedIntent

var getCourseSummaries = require('../helpers/get-course-summaries.js')
var states = require('../helpers/states.json')
var getNewState = require('../helpers/get-new-state.js')

// Purpose: saves the price given by the user and returns course summaries
function PriceReceivedIntent () {
  var options = require('../helpers/course-summary-options.json')
  /* if (this.event.request.dialogState === 'STARTED') {
    this.emit(':delegate')
  }  else if (this.event.request.dialogState === 'IN_PROGRESS' && this.event.request.intent.slots.amountOfDollars.value === undefined)  {
    this.emit(':delegate')
  } */
  if (this.event.request.intent.slots.amountOfDollars.value === undefined) {
    var nextState = getNextState()
    console.log(this.event.request.intent.name)

    console.log('amountOfDollars is undefined.  the next state is: ' + nextState.state)
    this.handler.state = nextState.state
    this.emit(':ask', nextState.response, nextState.reprompt)
  }
  else {
    options.price = this.event.request.intent.slots.amountOfDollars.value
    var nextState = getNewState()
    this.handler.state = nextState.state
    console.log('state: ' + this.handler.state )
    var emit = this.emit
    if (this.handler.state === states.PRICEMODE) {
      nextState = getNewState()
      this.handler.state = nextState.state
      getCourseSummaries(options, function (err, res) {
        if (err) {
          console.log(err)
          emit(':tell', err)
        }
        console.log(res)
        emit(':ask', res)
      })
    }
    else {
      this.emit(':ask', nextState.response, nextState.reprompt)
    }
  }
}
