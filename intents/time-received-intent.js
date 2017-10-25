// time-received-intent.js
// Purpose: a function that handles the time recevied intent
module.exports = TimeReceivedIntent

var states = require('../helpers/states.json')
var getNewState = require('../helpers/get-new-state.js')
var getCourseSummaries = require('../helpers/get-course-summaries.js')

// Purpose: saves the time given by the user and reprompts for more info
function TimeReceivedIntent () {
  var options = require('../helpers/course-summary-options.json')
  var nextState
  if (this.event.request.intent.slots.timeToPlay.value === undefined) {
    nextState = getNewState()
    this.handler.state = nextState.state
    this.emit(':ask', nextState.response, nextState.reprompt)
  } else {
    options.time = this.event.request.intent.slots.timeToPlay.value
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
