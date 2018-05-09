// launch-request.js
// Purpose: a function that handles the launche request and starts the skill
module.exports = LaunchRequest

var clearOptions = require('../helpers/clear-options.js')

function LaunchRequest (handlerInput) {

  const speechText = 'Welcome to the Alexa Skills Kit, you can say hello!';

  return handlerInput.responseBuilder
    .speak(speechText)
    .reprompt(speechText)
    .withSimpleCard('Hello World', speechText)
    .getResponse()
  // var options = require('../helpers/course-summary-options.json')
  // var responses = require('../helpers/responses.json')
  // clearOptions()
  // // var keys = Object.keys(options)
  // // for (var i = 0; i < keys.length; i++) {
  // //   console.log(options[keys[i]])
  // //   options[keys[i]] = null
  // //   console.log(options[keys[i]])
  // // }
  // this.emit(':ask', responses.launch.output, responses.launch.reprompt)
}
