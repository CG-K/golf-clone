module.exports = helpIntent

function helpIntent () {
  var helpOutput = 'Welcome to Golf Now.  The purpose of this skill is to book a ' +
   'tee time at a Golf Course so you can start playing! To start using the skill, ' +
   'say Alexa, ask GolfNow to book a tee time near me. You can also search for tee ' +
   'times at a specific city or zip code. For city, you can say Alexa, ask GolfNow ' +
   'to book a tee time in Orlando. For a specific zipcode, you can say Alexa ' +
   'ask GolfNow to book a tee time near 32819. What would you like to do?'

  var helpReprompt = 'Try saying: Alexa, ask GolfNow ' +
  'to book a tee time in Orlando'
  this.emit(':ask', helpOutput, helpReprompt)
}
