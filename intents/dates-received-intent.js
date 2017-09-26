// dates-received-intent.js
// Purpose: a function that handles the dates recevied intent
module.exports = DatesReceivedIntent

var options = require('../helpers/course-summary-options.json')
var states = require('../helpers/states.json')

// Purpose: saves the date of Golfers given by the user and prompts for more information
function DatesReceivedIntent () {
  if (this.event.request.dialogState === 'STARTED') {
    this.emit(':delegate')
  } else if (this.event.request.dialogState === 'IN_PROGRESS' && this.event.request.intent.slots.dateToPlay.value === undefined)  {
    this.emit(':delegate')
  } else {
    this.handler.state = states.DATESMODE
    options.date = this.event.request.intent.slots.dateToPlay.value
    var datesPrompt = 'What time would you like to golf?'
    var datesReprompt = 'What time would you like to play golf?'
    this.emit(':ask', datesPrompt, datesReprompt)
  }
}
