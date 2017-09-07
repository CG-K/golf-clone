// unhandled-intent.js
// Purpose: a function that handles all unhandled cases of sample utterances
module.exports = UnhandledIntent

var states = require('../helpers/states.json')
var responses = require('../helpers/responses.json')

function UnhandledIntent () {
  console.log(this.event.request)
  var unhandledOutput
  var repromptUnhandled
  switch (this.handler.state) {
    case states.HELPMODE:
      this.emitWithState('HelpIntent')
      unhandledOutput = responses.help.output
      repromptUnhandled = responses.help.reprompt
      break
    case states.LAUNCHMODE:
      this.emitWithState('LaunchRequest')
      unhandledOutput = responses.launch.output
      repromptUnhandled = responses.launch.reprompt
      break
    case states.LOCATIONMODE:
      this.emitWithState('GetLocation')
      unhandledOutput = responses.location.output
      repromptUnhandled = responses.location.reprompt
      break
    case states.DATESMODE:
      this.emitWithState('DatesReceived')
      unhandledOutput = responses.dates.output
      repromptUnhandled = responses.dates.reprompt
      break
    case states.TIMEMODE:
      this.emitWithState('TimeReceived')
      unhandledOutput = responses.time.output
      repromptUnhandled = responses.time.reprompt
      break
    case states.NUMGOLFERSMODE:
      this.emitWithState('NumGolfersReceived')
      unhandledOutput = responses.numGolfers.output
      repromptUnhandled = responses.numGolfers.reprompt
      break
    case states.PRICEMODE:
      this.emitWithState('PriceReceived')
      unhandledOutput = responses.price.output
      repromptUnhandled = responses.price.reprompt
      break
    default:
      unhandledOutput = 'You can ask Alexa to do things such as book a hot deal near me, or book a tee time near me.'
      repromptUnhandled = 'Do you want to book a tee time near you? If you do, say, ' +
        'Alexa ask GolfNow to book a hot deal near me.'
      this.emit(':ask', unhandledOutput, repromptUnhandled)

  }
}
