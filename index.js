var LaunchRequest = require('./intents/launch-request.js')
var HelpIntent = require('./intents/help-intent.js')
var StopIntent = require('./intents/stop-intent.js')
var CancelIntent = require('./intents/cancel-intent.js')
// var GetLocationIntent = require('./intents/get-location.js')

var Alexa = require('alexa-sdk')

exports.handler = function (event, context, callback) {
  // handle intents for our skill
  var alexa = Alexa.handler(event, context, callback)
  // register our event handlers
  alexa.registerHandlers(handlers)
  // run the app logic
  alexa.execute()
}

var handlers = {
  'LaunchRequest': LaunchRequest,
  'AMAZON.HelpIntent': HelpIntent,
  'AMAZON.StopIntent': StopIntent,
  'AMAZON.CancelIntent': CancelIntent
}
/*
var handlers = {
  'LaunchRequest': function () {
  },

  'GetLocation': GetLocationIntent
}
*/
