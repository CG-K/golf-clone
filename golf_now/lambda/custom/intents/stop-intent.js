// stop-intent.js
// Purpose: a function that handles the stop intent
module.exports = stopIntent

// Purpose: To stop the skill and close the session
function stopIntent () {
  var stopOutput = 'Stopping your Request and Exiting Skill'
  this.emit(':tell', stopOutput)
}
