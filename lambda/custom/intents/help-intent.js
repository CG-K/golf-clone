// help-intent.js
// Purpose: a function that handles the help intent
module.exports = helpIntent

function helpIntent (handlerInput) {
  var responses = require('../helpers/responses.json')
  return handlerInput.responseBuilder
    .speak(responses.help.output)
    .reprompt(responses.help.reprompt)
    .withSimpleCard('Need Help?', responses.help.output)
    .getResponse()
}
