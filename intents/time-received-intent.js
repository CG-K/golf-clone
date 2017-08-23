module.exports = TimeReceivedIntent

var options = require('../helpers/course-summary-options.json')

function TimeReceivedIntent () {
  options.time = this.event.request.intent.slots.timeToPlay
  var timePrompt = 'How many players would you like to golf with?'
  var timeReprompt = 'How many golfers would you like to play with?'
  this.emit(':ask', timePrompt, timeReprompt)
}
