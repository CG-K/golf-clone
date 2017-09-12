// unhandled-intent.js
// Purpose: a function that handles all unhandled cases of sample utterances
module.exports = UnhandledIntent

var states = require('../helpers/states.json')
var responses = require('../helpers/responses.json')

function UnhandledIntent () {
  var unhandledOutput
  var repromptUnhandled
  switch (this.handler.state) {
    case states.LOCATIONMODE:
      unhandledOutput = responses.dates.output
      repromptUnhandled = responses.dates.reprompt
      break
    case states.DATESMODE:
      unhandledOutput = responses.time.output
      repromptUnhandled = responses.time.reprompt
      break
    case states.TIMEMODE:
      unhandledOutput = responses.numGolfers.output
      repromptUnhandled = responses.numGolfers.reprompt
      break
    case states.NUMGOLFERSMODE:
      unhandledOutput = responses.price.output
      repromptUnhandled = responses.price.reprompt
      break
    default:
      unhandledOutput = responses.location.output
      repromptUnhandled = responses.location.reprompt
  }
  this.emit(':ask', unhandledOutput, repromptUnhandled)
}
