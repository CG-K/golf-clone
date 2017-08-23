module.exports = NumGolfersReceivedIntent

var options = require('../helpers/course-summary-options.json')

function NumGolfersReceivedIntent () {
  options.numGolfers = this.event.request.intent.slots.numberOfGolfers
  var numGolfersPrompt = 'What is the most you would like to spend per player?'
  var numGolfersRerompt = 'How much money are you willing to spend per player?'
  this.emit(':ask', numGolfersPrompt, numGolfersRerompt)
}
