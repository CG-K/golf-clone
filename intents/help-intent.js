// help-intent.js
// Purpose: a function that handles the help intent
module.exports = helpIntent

function helpIntent () {
  var responses = require('../helpers/responses.json')
  console.log('output for help: ' + responses.help.output)
  this.emit(':ask', responses.help.output, responses.help.reprompt)
}
