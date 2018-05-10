// help-intent.js
// Purpose: a function that handles the help intent
module.exports = helpIntent

function helpIntent () {
  var responses = require('../helpers/responses.json')
  this.emit(':ask', responses.help.output, responses.help.reprompt)
}
