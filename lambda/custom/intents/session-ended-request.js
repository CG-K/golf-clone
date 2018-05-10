// session-ended-request.js
// Purpose: End the Skill and the session
module.exports = sessionEndedRequest

// Purpose: End the Skill and the session
function sessionEndedRequest () {
  var sessionEndedOutput = 'Stopping your Request and Exiting Skill'
  this.emit(':tell', sessionEndedOutput)
}
