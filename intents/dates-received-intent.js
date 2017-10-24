// dates-received-intent.js
// Purpose: a function that handles the dates recevied intent
module.exports = DatesReceivedIntent

var states = require('../helpers/states.json')
var getNewState = require('../helpers/get-new-state.js')
var getCourseSummaries = require('../helpers/get-course-summaries.js')


// Purpose: saves the date of Golfers given by the user and prompts for more information
function DatesReceivedIntent () {
  var options = require('../helpers/course-summary-options.json')
  /* if (this.event.request.dialogState === 'STARTED') {
    this.emit(':delegate')
  } else if (this.event.request.dialogState === 'IN_PROGRESS' && this.event.request.intent.slots.dateToPlay.value === undefined)  {
    this.emit(':delegate')
  } */
  if (this.event.request.intent.slots.dateToPlay.value === undefined) {
    var nextState = getNextState()
    console.log(this.event.request.intent.name)
    console.log('date to play is undefined.  the next state is: ' + nextState.state)
    this.handler.state = nextState.state
    this.emit(':ask', nextState.response, nextState.reprompt)
  }
  else {
    options.date = this.event.request.intent.slots.dateToPlay.value
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
