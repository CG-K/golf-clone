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
var SessionEndedRequest = require('./intents/session-ended-request.js')
var states = require('./helpers/states.json')

require('dotenv').config()
const APP_ID = process.env.APP_ID

var Alexa = require('alexa-sdk')

exports.handler = function (event, context, callback) {
  // handle intents for our skill
  var alexa = Alexa.handler(event, context, callback)
  alexa.appId = APP_ID
  // register our event handlers
  alexa.registerHandlers(handlers, locationHandlers, dateHandlers, timeHandlers, numGolfersHandlers, priceHandlers)
  // run the app logic
  alexa.execute()
}

var handlers = {
  'LaunchRequest': LaunchRequest,
  'AMAZON.HelpIntent': HelpIntent,
  'AMAZON.StopIntent': StopIntent,
  'AMAZON.CancelIntent': CancelIntent,
  'GetLocation': GetLocationIntent,
  'Unhandled': UnhandledIntent,
  'SessionEndedRequest': SessionEndedRequest
}

var locationHandlers = Alexa.CreateStateHandler(states.LOCATIONMODE, {
  'LaunchRequest': LaunchRequest,
  'AMAZON.HelpIntent': HelpIntent,
  'AMAZON.StopIntent': StopIntent,
  'AMAZON.CancelIntent': CancelIntent,
  'DatesReceived': DatesReceivedIntent,
  'Unhandled': UnhandledIntent,
  'SessionEndedRequest': SessionEndedRequest
})

var dateHandlers = Alexa.CreateStateHandler(states.DATESMODE, {
  'LaunchRequest': LaunchRequest,
  'AMAZON.HelpIntent': HelpIntent,
  'AMAZON.StopIntent': StopIntent,
  'AMAZON.CancelIntent': CancelIntent,
  'TimeReceived': TimeReceivedIntent,
  'Unhandled': UnhandledIntent,
  'SessionEndedRequest': SessionEndedRequest
})

var timeHandlers = Alexa.CreateStateHandler(states.TIMEMODE, {
  'LaunchRequest': LaunchRequest,
  'AMAZON.HelpIntent': HelpIntent,
  'AMAZON.StopIntent': StopIntent,
  'AMAZON.CancelIntent': CancelIntent,
  'NumGolfersReceived': NumGolfersReceivedIntent,
  'Unhandled': UnhandledIntent,
  'SessionEndedRequest': SessionEndedRequest
})

var numGolfersHandlers = Alexa.CreateStateHandler(states.NUMGOLFERSMODE, {
  'LaunchRequest': LaunchRequest,
  'AMAZON.HelpIntent': HelpIntent,
  'AMAZON.StopIntent': StopIntent,
  'AMAZON.CancelIntent': CancelIntent,
  'PriceReceived': PriceReceivedIntent,
  'Unhandled': UnhandledIntent,
  'SessionEndedRequest': SessionEndedRequest
})

var priceHandlers = Alexa.CreateStateHandler(states.PRICEMODE, {
  'LaunchRequest': LaunchRequest,
  'AMAZON.HelpIntent': HelpIntent,
  'AMAZON.StopIntent': StopIntent,
  'AMAZON.CancelIntent': CancelIntent,
  'PriceReceived': PriceReceivedIntent,
  'GetLocation': GetLocationIntent,
  'Unhandled': UnhandledIntent,
  'SessionEndedRequest': SessionEndedRequest
})
