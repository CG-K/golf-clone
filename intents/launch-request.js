module.exports = LaunchRequest

function LaunchRequest () {
  var launchOutput = 'Welcome to GolfNow.  You can book tee times at your ' +
   'favorite nearby courses.  You can say Alexa, ask GolfNow to book a tee time ' +
   'near me.  What would you like to do?'
  var repromptLaunch = 'Do you want to book a tee time near you? If you do, say, ' +
   'Alexa ask GolfNow to book a tee time near me'
  this.emit(':ask', launchOutput, repromptLaunch)
}
