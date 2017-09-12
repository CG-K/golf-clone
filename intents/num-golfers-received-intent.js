// num-golfers-received-intent.js
// Purpose: a function that handles the num golfers recevied intent
module.exports = NumGolfersReceivedIntent

var options = require('../helpers/course-summary-options.json')
var states = require('../helpers/states.json')
const MAX_GOLFERS = 4
const NO_GOLFERS = 0

// Purpose: saves the number of Golfers given by the user and prompts for more information
function NumGolfersReceivedIntent () {
  console.log(this.event.request.intent.name)
  this.handler.state = states.NUMGOLFERSMODE
  if (this.event.request.intent.slots.numberOfGolfers.value !== undefined) {
    if (this.event.request.intent.slots.numberOfGolfers.value > MAX_GOLFERS || this.event.request.intent.slots.numberOfGolfers.value < NO_GOLFERS) {
      var outOfNumGolferRange = 'We cannot search for ' + this.event.request.intent.slots.numberOfGolfers.value + '. You can search for 1, 2, 3, 4, or any number of golfers.'
      var outOfNumGolferRangeReprompt = 'You can search for 1, 2, 3, 4, or any number of golfers.'
      // go back in state because information was not gathered properly
      this.handler.state= states.TIMEMODE
      this.emit(':ask', outOfNumGolferRange, outOfNumGolferRangeReprompt)
    } else {
      options.numGolfers = this.event.request.intent.slots.numberOfGolfers.value
    }
  }
  console.log('The Current State is: ' + this.event.session.attributes.STATE)
  console.log(this.event.request.intent.slots.numberOfGolfers.value)
  var numGolfersPrompt = 'What is the most you would like to spend per player?'
  var numGolfersRerompt = 'How much money are you willing to spend per player?'
  this.emit(':ask', numGolfersPrompt, numGolfersRerompt)
}
