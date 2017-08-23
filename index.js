var LaunchRequest = require('./intents/launch-request.js')
var HelpIntent = require('./intents/help-intent.js')
var StopIntent = require('./intents/stop-intent.js')
var CancelIntent = require('./intents/cancel-intent.js')
var GetLocationIntent = require('./intents/get-location.js')
var DatesReceivedIntent = require('./intents/dates-received-intent.js')
var TimeReceivedIntent = require('./intents/time-received-intent.js')
var NumGolfersReceivedIntent = require('./intents/num-golfers-received-intent.js')

require('dotenv').config()
const APP_ID = process.env.APP_ID

var Alexa = require('alexa-sdk')

exports.handler = function (event, context, callback) {
  // handle intents for our skill
  var alexa = Alexa.handler(event, context, callback)
  alexa.appId = APP_ID
  // register our event handlers
  alexa.registerHandlers(handlers)
  // run the app logic
  alexa.execute()
}

var handlers = {
  'LaunchRequest': LaunchRequest,
  'AMAZON.HelpIntent': HelpIntent,
  'AMAZON.StopIntent': StopIntent,
  'AMAZON.CancelIntent': CancelIntent,
  'GetLocation': GetLocationIntent,
  'DatesReceived': DatesReceivedIntent,
  'TimeReceived': TimeReceivedIntent,
  'NumGolfersReceived': NumGolfersReceivedIntent
}
