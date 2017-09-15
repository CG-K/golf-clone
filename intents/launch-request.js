// launch-request.js
// Purpose: a function that handles the launche request and starts the skill
module.exports = LaunchRequest

function LaunchRequest () {
  var responses = require('../helpers/responses.json')
  this.emit(':ask', responses.launch.output, responses.launch.reprompt)
}
