// dates-received-intent.js
// Purpose: a function that handles the dates recevied intent
module.exports = DatesReceivedIntent

var options = require('../helpers/course-summary-options.json')

// Purpose: saves the date of Golfers given by the user and prompts for more information
function DatesReceivedIntent () {
  options.date = this.event.request.intent.slots.dateToPlay.value
  var datesPrompt = 'What time would you like to play?'
  var datesReprompt = 'What time would you like to golf?'
  this.emit(':ask', datesPrompt, datesReprompt)
}
