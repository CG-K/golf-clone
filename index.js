var LaunchRequest = require('./intents/launch-request.js')
var HelpIntent = require('./intents/help-intent.js')
var StopIntent = require('./intents/stop-intent.js')
var CancelIntent = require('./intents/cancel-intent.js')
var GetLocationIntent = require('./intents/get-location.js')
var DatesReceivedIntent = require('./intents/dates-received-intent.js')
var TimeReceivedIntent = require('./intents/time-received-intent.js')
var NumGolfersReceivedIntent = require('./intents/num-golfers-received-intent.js')
var PriceReceivedIntent = require('./intents/price-received-intent.js')
var UnhandledIntent = require('./intents/unhandled-intent.js')
var states = require('./helpers/states.json')

require('dotenv').config()
const APP_ID = process.env.APP_ID

var Alexa = require('alexa-sdk')

exports.handler = function (event, context, callback) {
  // handle intents for our skill
  var alexa = Alexa.handler(event, context, callback)
  alexa.appId = APP_ID
  // register our event handlers
  alexa.registerHandlers(launchHandlers, locationHandlers, dateHandlers, timeHandlers, numGolfersHandlers, handlers)
  // run the app logic
  alexa.execute()
}

var handlers = {
  'LaunchRequest': LaunchRequest,
  'AMAZON.HelpIntent': HelpIntent,
  'AMAZON.StopIntent': StopIntent,
  'AMAZON.CancelIntent': CancelIntent,
  'Unhandled': UnhandledIntent,
  'GetLocation': GetLocationIntent,
  'DatesReceived': DatesReceivedIntent,
  'TimeReceived': TimeReceivedIntent,
  'NumGolfersReceived': NumGolfersReceivedIntent,
  'PriceReceived': PriceReceivedIntent
}

var launchHandlers = Alexa.CreateStateHandler(states.LAUNCHMODE, {
  'LaunchRequest': LaunchRequest,
  'AMAZON.HelpIntent': HelpIntent,
  'AMAZON.StopIntent': StopIntent,
  'AMAZON.CancelIntent': CancelIntent,
  'Unhandled': UnhandledIntent,
  'GetLocation': GetLocationIntent
})

var locationHandlers = Alexa.CreateStateHandler(states.LOCATIONMODE, {
  'LaunchRequest': LaunchRequest,
  'AMAZON.HelpIntent': HelpIntent,
  'AMAZON.StopIntent': StopIntent,
  'AMAZON.CancelIntent': CancelIntent,
  'Unhandled': UnhandledIntent,
  'DatesReceived': DatesReceivedIntent
})

var dateHandlers = Alexa.CreateStateHandler(states.DATESMODE, {
  'LaunchRequest': LaunchRequest,
  'AMAZON.HelpIntent': HelpIntent,
  'AMAZON.StopIntent': StopIntent,
  'AMAZON.CancelIntent': CancelIntent,
  'Unhandled': UnhandledIntent,
  'TimeReceived': TimeReceivedIntent
})

var timeHandlers = Alexa.CreateStateHandler(states.TIMEMODE, {
  'LaunchRequest': LaunchRequest,
  'AMAZON.HelpIntent': HelpIntent,
  'AMAZON.StopIntent': StopIntent,
  'AMAZON.CancelIntent': CancelIntent,
  'Unhandled': UnhandledIntent,
  'NumGolfersReceived': NumGolfersReceivedIntent
})

var numGolfersHandlers = Alexa.CreateStateHandler(states.NUMGOLFERSMODE, {
  'LaunchRequest': LaunchRequest,
  'AMAZON.HelpIntent': HelpIntent,
  'AMAZON.StopIntent': StopIntent,
  'AMAZON.CancelIntent': CancelIntent,
  'Unhandled': UnhandledIntent,
  'PriceReceived': PriceReceivedIntent
})
