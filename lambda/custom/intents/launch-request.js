// launch-request.js
// Purpose: a function that handles the launche request and starts the skill
module.exports = LaunchRequest

var clearOptions = require('../helpers/clear-options.js')

function LaunchRequest (handlerInput) {
  var responses = require('../helpers/responses.json')
  clearOptions(handlerInput)
  return handlerInput.responseBuilder
    .speak(responses.launch.output)
    .reprompt(responses.launch.reprompt)
    .withSimpleCard('Welcome to Golf Now', responses.launch.output)
    .getResponse()
}
