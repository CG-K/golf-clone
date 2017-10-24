// num-golfers-received-intent.js
// Purpose: a function that handles the num golfers recevied intent
module.exports = NumGolfersReceivedIntent

var states = require('../helpers/states.json')
var getNewState = require('../helpers/get-new-state.js')
var getCourseSummaries = require('../helpers/get-course-summaries.js')

const MAX_GOLFERS = 4
const NO_GOLFERS = 0

// Purpose: saves the number of Golfers given by the user and prompts for more information
function NumGolfersReceivedIntent () {
  var options = require('../helpers/course-summary-options.json')
  /* if (this.event.request.dialogState === 'STARTED') {
    this.emit(':delegate')
  }  else if (this.event.request.dialogState === 'IN_PROGRESS' && this.event.request.intent.slots.numberOfGolfers.value === undefined)  {
    this.emit(':delegate')
  } */
  if (this.event.request.intent.slots.numberOfGolfers.value === undefined) {
    var nextState = getNextState()
    console.log(this.event.request.intent.name)
    console.log('numberOfGolfers is undefined.  the next state is: ' + nextState.state)
    this.handler.state = nextState.state
    this.emit(':ask', nextState.response, nextState.reprompt)
  }
  else {
      if (this.event.request.intent.slots.numberOfGolfers.value > MAX_GOLFERS || this.event.request.intent.slots.numberOfGolfers.value < NO_GOLFERS) {
        var outOfNumGolferRange = 'We cannot search for ' + this.event.request.intent.slots.numberOfGolfers.value + '. You can search for 1, 2, 3, 4, or any number of golfers.'
        var outOfNumGolferRangeReprompt = 'You can search for 1, 2, 3, 4, or any number of golfers.'
        // go back in state because information was not gathered properly
        this.handler.state = states.TIMEMODE
        this.emit(':ask', outOfNumGolferRange, outOfNumGolferRangeReprompt)
      } else {
        options.numGolfers = this.event.request.intent.slots.numberOfGolfers.value
        var nextState = getNewState()
        this.handler.state = nextState.state
        console.log('state: ' + this.handler.state )
        var emit = this.emit
        var handler = this.handler
        if (this.handler.state === states.PRICEMODE) {
          getCourseSummaries(options, function (err, res) {
            if (err) {
              console.log(err)
              emit(':tell', err)
            }
            console.log(res)
            nextState = getNewState()
            handler.state = nextState.state
            emit(':ask', res)
          })
        } else {
          this.emit(':ask', nextState.response, nextState.reprompt)
        }
    }
  }
}
