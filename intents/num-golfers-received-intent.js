// num-golfers-received-intent.js
// Purpose: a function that handles the num golfers recevied intent
module.exports = NumGolfersReceivedIntent

var options = require('../helpers/course-summary-options.json')
var states = require('../helpers/states.json')

// Purpose: saves the number of Golfers given by the user and prompts for more information
function NumGolfersReceivedIntent () {
  console.log(this.event.request.intent.name)
  this.handler.state = states.NUMGOLFERSMODE
  options.numGolfers = this.event.request.intent.slots.numberOfGolfers.value
  console.log('The Current State is: ' + this.event.session.attributes.STATE)
  console.log(this.event.request.intent.slots.numberOfGolfers.value)
  var numGolfersPrompt = 'What is the most you would like to spend per player?'
  var numGolfersRerompt = 'How much money are you willing to spend per player?'
  this.handler.state = states.PRICEMODE
  this.emit(':ask', numGolfersPrompt, numGolfersRerompt)
}
