module.exports = DatesReceivedIntent

var options = require('../helpers/course-summary-options.json')

function DatesReceivedIntent () {
  options.date = this.event.request.intent.slots.dateToPlay
  var datesPrompt = 'What time would you like to play?'
  var datesReprompt = 'What time would you like to golf?'
  this.emit(':ask', datesPrompt, datesReprompt)
}
