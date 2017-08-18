module.exports = cancelIntent

function cancelIntent () {
  var cancelOutput = 'Canceling your Request and Exiting Skill'
  this.emit(':tell', cancelOutput)
}
