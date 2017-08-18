module.exports = stopIntent

function stopIntent () {
  var stopOutput = 'Stopping your Request and Exiting Skill'
  this.emit(':tell', stopOutput)
}
