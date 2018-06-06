// stop-intent.js
// Purpose: a function that handles the stop intent
module.exports = stopIntent

// Purpose: To stop the skill and close the session
function stopIntent (handlerInput) {
  var responses = require('../helpers/responses.json')
  return handlerInput.responseBuilder
    .speak(responses.stop.output)
    .withSimpleCard('Goodbye!', responses.stop.output)
    .getResponse()
}
