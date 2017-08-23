// cancel-intent.js
// Purpose: a function that handles the cancel intent
module.exports = cancelIntent

// Purpose: To cancel the skill and close the session
function cancelIntent () {
  var cancelOutput = 'Canceling your Request and Exiting Skill'
  this.emit(':tell', cancelOutput)
}
