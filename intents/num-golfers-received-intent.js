// num-golfers-received-intent.js
// Purpose: a function that handles the num golfers recevied intent
module.exports = NumGolfersReceivedIntent

var options = require('../helpers/course-summary-options.json')

// Purpose: saves the number of Golfers given by the user and prompts for more information
function NumGolfersReceivedIntent () {
  options.numGolfers = this.event.request.intent.slots.numberOfGolfers.value
  var numGolfersPrompt = 'What is the most you would like to spend per player?'
  var numGolfersRerompt = 'How much money are you willing to spend per player?'
  this.emit(':ask', numGolfersPrompt, numGolfersRerompt)
}
