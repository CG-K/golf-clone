// dates-received-intent.js
// Purpose: a function that handles the dates recevied intent
module.exports = DatesReceivedIntent

var options = require('../helpers/course-summary-options.json')
var states = require('../helpers/states.json')

// Purpose: saves the date of Golfers given by the user and prompts for more information
function DatesReceivedIntent () {
  this.handler.state = states.DATESMODE
  options.date = this.event.request.intent.slots.dateToPlay.value
  if (options.date === undefined) {
    // date did not make sense, and unhandled did not catch it
    var didNotUnderstandDate = 'I did not understand that date you said.  You can say something like tomorrow, today, or Next Tuesday.'
    var didNotUnderstandReprompt = 'You can say something like tomorrow, today, or Next Tuesday.'
    this.emit(':ask', didNotUnderstandDate, didNotUnderstandReprompt)
  }
  var datesPrompt = 'What time would you like to play?'
  var datesReprompt = 'What time would you like to golf?'
  this.emit(':ask', datesPrompt, datesReprompt)
}
