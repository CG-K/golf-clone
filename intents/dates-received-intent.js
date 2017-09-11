// dates-received-intent.js
// Purpose: a function that handles the dates recevied intent
module.exports = DatesReceivedIntent

var options = require('../helpers/course-summary-options.json')
var states = require('../helpers/states.json')

// Purpose: saves the date of Golfers given by the user and prompts for more information
function DatesReceivedIntent () {
  console.log(this.event.request.intent.name)
  this.handler.state = states.DATESMODE
  console.log('The Current State is: ' + this.event.session.attributes.STATE)
  options.date = this.event.request.intent.slots.dateToPlay.value
  console.log(this.event.request.intent.slots.dateToPlay.value)
  var datesPrompt = 'What time would you like to play?'
  var datesReprompt = 'What time would you like to golf?'
  this.emit(':ask', datesPrompt, datesReprompt)
}
