// time-received-intent.js
// Purpose: a function that handles the time recevied intent
module.exports = TimeReceivedIntent

var options = require('../helpers/course-summary-options.json')
var states = require('../helpers/states.json')

// Purpose: saves the time given by the user and reprompts for more info
function TimeReceivedIntent () {
  if (this.event.request.dialogState !== 'COMPLETED') {
    this.emit(':delegate')
  } else {
    this.handler.state = states.TIMEMODE
    options.time = this.event.request.intent.slots.timeToPlay.value
    var timePrompt = 'How many players would you like to golf with?'
    var timeReprompt = 'How many golfers would you like to play with?'
    this.emit(':ask', timePrompt, timeReprompt)
  }
}
