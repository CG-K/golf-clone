var LaunchRequest = require('./intents/launch-request.js')
// var HelpIntent = require('./intents/help-intent.js')
// var StopIntent = require('./intents/stop-intent.js')
// var CancelIntent = require('./intents/cancel-intent.js')
// var BookTimeIntent = require('./intents/book-time.js')
// var DatesReceivedIntent = require('./intents/dates-received-intent.js')
// var TimeReceivedIntent = require('./intents/time-received-intent.js')
// var NumberReceivedIntent = require('./intents/number-received-intent.js')
// // var NumGolfersReceivedIntent = require('./intents/num-golfers-received-intent.js')
// // var PriceReceivedIntent = require('./intents/price-received-intent.js')
// var HearOptionsIntent = require('./intents/hear-options-intent.js')
// var SelectOptionsIntent = require('./intents/select-options-intent.js')
// var UnhandledIntent = require('./intents/unhandled-intent.js')
// var SessionEndedRequest = require('./intents/session-ended-request.js')
// var states = require('./helpers/states.json')

// require('dotenv').config()
// const APP_ID = process.env.APP_ID

var Alexa = require('ask-sdk')



// exports.handler = function (event, context, callback) {
//   // handle intents for our skill
//   var alexa = Alexa.handler(event, context, callback)
//   alexa.appId = APP_ID
//   // register our event handlers
//   alexa.registerHandlers(handlers, locationHandlers, dateHandlers, timeHandlers, numGolfersHandlers, priceHandlers, hearCoursesHandlers, selectCourseHandlers, hearTeeTimesHandlers, selectTeeTimeHandlers)
//   // run the app logic
//   alexa.execute()
// }

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    console.log(JSON.stringify(handlerInput))
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest'
  },
  handle(handlerInput) {
    console.log('We in launch')
    return LaunchRequest(handlerInput)
    // const speechText = 'Welcome to the Alexa Skills Kit, you can say hello!';
    //
    // return handlerInput.responseBuilder
    //   .speak(speechText)
    //   .reprompt(speechText)
    //   .withSimpleCard('Hello World', speechText)
    //   .getResponse()
  }
}

const HelloWorldIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntent'
  },
  handle(handlerInput) {
    const speechText = 'Hello World!'

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse()
  },
}

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent'
  },
  handle(handlerInput) {
    const speechText = 'You can say hello to me!'

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse()
  },
}

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent')
  },
  handle(handlerInput) {
    const speechText = 'Goodbye!'

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse()
  },
}

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`)

    return handlerInput.responseBuilder.getResponse()
  },
}

const ErrorHandler = {
  canHandle() {
    return true
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`)

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse()
  },
}

exports.handler = Alexa.SkillBuilders.custom()
     .addRequestHandlers(LaunchRequestHandler,
                         HelloWorldIntentHandler,
                         HelpIntentHandler,
                         CancelAndStopIntentHandler,
                         SessionEndedRequestHandler)
     .addErrorHandlers(ErrorHandler)
     .lambda()
//
// var handlers = {
//   'LaunchRequest': LaunchRequest,
//   'AMAZON.HelpIntent': HelpIntent,
//   'AMAZON.StopIntent': StopIntent,
//   'AMAZON.CancelIntent': CancelIntent,
//   'BookTime': BookTimeIntent,
//   'Unhandled': UnhandledIntent,
//   'SessionEndedRequest': SessionEndedRequest
// }
//
// var locationHandlers = Alexa.CreateStateHandler(states.LOCATIONMODE, {
//   'LaunchRequest': LaunchRequest,
//   'AMAZON.HelpIntent': HelpIntent,
//   'AMAZON.StopIntent': StopIntent,
//   'AMAZON.CancelIntent': CancelIntent,
//   'DatesReceived': DatesReceivedIntent,
//   'Unhandled': UnhandledIntent,
//   'SessionEndedRequest': SessionEndedRequest
// })
//
// var dateHandlers = Alexa.CreateStateHandler(states.DATESMODE, {
//   'LaunchRequest': LaunchRequest,
//   'AMAZON.HelpIntent': HelpIntent,
//   'AMAZON.StopIntent': StopIntent,
//   'AMAZON.CancelIntent': CancelIntent,
//   'TimeReceived': TimeReceivedIntent,
//   'Unhandled': UnhandledIntent,
//   'SessionEndedRequest': SessionEndedRequest
// })
//
// var timeHandlers = Alexa.CreateStateHandler(states.TIMEMODE, {
//   'LaunchRequest': LaunchRequest,
//   'AMAZON.HelpIntent': HelpIntent,
//   'AMAZON.StopIntent': StopIntent,
//   'AMAZON.CancelIntent': CancelIntent,
//   'NumberReceived': NumberReceivedIntent,
//   'Unhandled': UnhandledIntent,
//   'SessionEndedRequest': SessionEndedRequest
// })
//
// var numGolfersHandlers = Alexa.CreateStateHandler(states.NUMGOLFERSMODE, {
//   'LaunchRequest': LaunchRequest,
//   'AMAZON.HelpIntent': HelpIntent,
//   'AMAZON.StopIntent': StopIntent,
//   'AMAZON.CancelIntent': CancelIntent,
//   'NumberReceived': NumberReceivedIntent,
//   'Unhandled': UnhandledIntent,
//   'SessionEndedRequest': SessionEndedRequest
// })
//
// var priceHandlers = Alexa.CreateStateHandler(states.PRICEMODE, {
//   'LaunchRequest': LaunchRequest,
//   'AMAZON.HelpIntent': HelpIntent,
//   'AMAZON.StopIntent': StopIntent,
//   'AMAZON.CancelIntent': CancelIntent,
//   'HearOptions': HearOptionsIntent,
//   'BookTime': BookTimeIntent,
//   'Unhandled': UnhandledIntent,
//   'SessionEndedRequest': SessionEndedRequest
// })
//
// var hearCoursesHandlers = Alexa.CreateStateHandler(states.HEARCOURSESMODE, {
//   'LaunchRequest': LaunchRequest,
//   'AMAZON.HelpIntent': HelpIntent,
//   'AMAZON.StopIntent': StopIntent,
//   'AMAZON.CancelIntent': CancelIntent,
//   'HearOptions': HearOptionsIntent,
//   'SelectOptions': SelectOptionsIntent,
//   'BookTime': BookTimeIntent,
//   'Unhandled': UnhandledIntent,
//   'SessionEndedRequest': SessionEndedRequest
// })
//
// var selectCourseHandlers = Alexa.CreateStateHandler(states.SELECTCOURSEMODE, {
//   'LaunchRequest': LaunchRequest,
//   'AMAZON.HelpIntent': HelpIntent,
//   'AMAZON.StopIntent': StopIntent,
//   'AMAZON.CancelIntent': CancelIntent,
//   'HearOptions': HearOptionsIntent,
//   'BookTime': BookTimeIntent,
//   'Unhandled': UnhandledIntent,
//   'SessionEndedRequest': SessionEndedRequest
// })
//
// var hearTeeTimesHandlers = Alexa.CreateStateHandler(states.HEARTEETIMESMODE, {
//   'LaunchRequest': LaunchRequest,
//   'AMAZON.HelpIntent': HelpIntent,
//   'AMAZON.StopIntent': StopIntent,
//   'AMAZON.CancelIntent': CancelIntent,
//   'HearOptions': HearOptionsIntent,
//   'SelectOptions': SelectOptionsIntent,
//   'BookTime': BookTimeIntent,
//   'Unhandled': UnhandledIntent,
//   'SessionEndedRequest': SessionEndedRequest
// })
//
// var selectTeeTimeHandlers = Alexa.CreateStateHandler(states.SELECTTEETIMEMODE, {
//   'LaunchRequest': LaunchRequest,
//   'AMAZON.HelpIntent': HelpIntent,
//   'AMAZON.StopIntent': StopIntent,
//   'AMAZON.CancelIntent': CancelIntent,
//   'BookTime': BookTimeIntent,
//   'Unhandled': UnhandledIntent,
//   'SessionEndedRequest': SessionEndedRequest
// })
