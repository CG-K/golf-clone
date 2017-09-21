// launch-request.js
// Purpose: a function that handles the launche request and starts the skill
module.exports = LaunchRequest

var states = require('../helpers/states.json')

function LaunchRequest () {
  this.handler.state = ''
  var responses = require('../helpers/responses.json')
  this.emit(':ask', responses.launch.output, responses.launch.reprompt)
}
