// number-received-intent.js
// Purpose: a function that handles the num golfers or price intent
module.exports = NumberReceivedIntent

var states = require('../helpers/states.json')
var getNewState = require('../helpers/get-new-state.js')
var getCourseSummaries = require('../helpers/get-course-summaries.js')

const MAX_GOLFERS = 4
const NO_GOLFERS = 0

// Purpose: a function that handles the num golfers or price intent
function NumberReceivedIntent () {
  var options = require('../helpers/course-summary-options.json')
  var nextState
  var emit = this.emit
  var handler = this.handler
  if (this.handler.state === states.TIMEMODE) {
    if (this.event.request.intent.slots.golfersPrice.value === undefined) {
      nextState = getNewState()
      this.handler.state = nextState.state
      this.emit(':ask', nextState.response, nextState.reprompt)
    } else {
      if (this.event.request.intent.slots.golfersPrice.value > MAX_GOLFERS || this.event.request.intent.slots.golfersPrice.value < NO_GOLFERS) {
        var outOfNumGolferRange = 'We cannot search for ' + this.event.request.intent.slots.golfersPrice.value + '. You can search for 1, 2, 3, 4, or any number of golfers.'
        var outOfNumGolferRangeReprompt = 'You can search for 1, 2, 3, 4, or any number of golfers.'
          // go back in state because information was not gathered properly
        this.handler.state = states.TIMEMODE
        this.emit(':ask', outOfNumGolferRange, outOfNumGolferRangeReprompt)
      } else {
        options.numGolfers = this.event.request.intent.slots.golfersPrice.value
        nextState = getNewState()
        this.handler.state = nextState.state
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
  } else if (this.handler.state === states.NUMGOLFERSMODE) {
    if (this.event.request.intent.slots.golfersPrice.value === undefined) {
      nextState = getNewState()
      this.handler.state = nextState.state
      this.emit(':ask', nextState.response, nextState.reprompt)
    } else {
      options.price = this.event.request.intent.slots.golfersPrice.value
      nextState = getNewState()
      this.handler.state = nextState.state
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
}
