var LaunchRequest = require('./intents/launch-request.js')
var HelpIntent = require('./intents/help-intent.js')
var StopIntent = require('./intents/stop-intent.js')
var BookTime = require('./intents/book-time.js')
// var DatesReceivedIntent = require('./intents/dates-received-intent.js')
// var TimeReceivedIntent = require('./intents/time-received-intent.js')
// var NumberReceivedIntent = require('./intents/number-received-intent.js')
// // var NumGolfersReceivedIntent = require('./intents/num-golfers-received-intent.js')
// // var PriceReceivedIntent = require('./intents/price-received-intent.js')
// var HearOptionsIntent = require('./intents/hear-options-intent.js')
// var SelectOptionsIntent = require('./intents/select-options-intent.js')
// var UnhandledIntent = require('./intents/unhandled-intent.js')
var states = require('./helpers/states.json')

// require('dotenv').config()
// const APP_ID = process.env.APP_ID

var Alexa = require('ask-sdk')

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    console.log(JSON.stringify(handlerInput))
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest'
  },
  handle(handlerInput) {
    console.log('We in launch')
    return LaunchRequest(handlerInput)
  }
}

const BoookTimeIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'BookTime'
  },
  async handle(handlerInput) {
    return await BookTime(handlerInput)
    console.log('We are finished with BookTime')
  },
}

// const DatesReceivedIntentHandler = {
//   canHandle(handlerInput) {
//     let sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
//     return handlerInput.requestEnvelope.request.type === 'IntentRequest'
//       && handlerInput.requestEnvelope.request.intent.name === 'DatesReceived'
//       && sessionAttributes['STATE'] = states.LOCATIONMODE
//   },
//   handle(handlerInput) {
//     return DatesReceivedIntent(handlerInput)
//   },
// }

// const TimeReceivedIntentHandler = {
//   canHandle(handlerInput) {
//     let sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
//     return handlerInput.requestEnvelope.request.type === 'IntentRequest'
//       && handlerInput.requestEnvelope.request.intent.name === 'TimeReceived'
//       && sessionAttributes['STATE'] = states.DATESMODE
//   },
//   handle(handlerInput) {
//     return TimeReceivedIntent(handlerInput)
//   },
// }

// const NumberReceivedIntentHandler = {
//   canHandle(handlerInput) {
//     let sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
//     return handlerInput.requestEnvelope.request.type === 'IntentRequest'
//       && handlerInput.requestEnvelope.request.intent.name === 'NumGolfersReceived'
//       && sessionAttributes['STATE'] = ( states.TIMEMODE || states.NUMGOLFERSMODE )
//   },
//   handle(handlerInput) {
//     return NumberReceivedIntent(handlerInput)
//   },
//

// const NumberGolfersReceivedIntentHandler = {
//   canHandle(handlerInput) {
//     let sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
//     return handlerInput.requestEnvelope.request.type === 'IntentRequest'
//       && handlerInput.requestEnvelope.request.intent.name === 'NumGolfersReceived'
//       && sessionAttributes['STATE'] = states.TIMEMODE
//   },
//   handle(handlerInput) {
//     return NumberReceivedIntent(handlerInput)
//   },
// }

// const PriceReceivedIntentHandler = {
//   canHandle(handlerInput) {
//     let sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
//     return handlerInput.requestEnvelope.request.type === 'IntentRequest'
//       && handlerInput.requestEnvelope.request.intent.name === 'PriceReceived'
//       && sessionAttributes['STATE'] = states.NUMGOLFERSMODE
//   },
//   handle(handlerInput) {
//     return NumberReceivedIntent(handlerInput)
//   },
// }

// const HearOptionsIntentHandler = {
//   canHandle(handlerInput) {
//     let sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
//     return handlerInput.requestEnvelope.request.type === 'IntentRequest'
//       && handlerInput.requestEnvelope.request.intent.name === 'PriceReceived'
//       && sessionAttributes['STATE'] = (states.HEARCOURSESMODE || states.HEARTEETIMESMODE)
//   },
//   handle(handlerInput) {
//     return HearOptionsIntent(handlerInput)
//   },
// }

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent'
  },
  handle(handlerInput) {
    return HelpIntent(handlerInput)
  },
}

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent')
  },
  handle(handlerInput) {
    return StopIntent(handlerInput)
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
                         BoookTimeIntentHandler,
                         HelpIntentHandler,
                         CancelAndStopIntentHandler,
                         SessionEndedRequestHandler)
     .addErrorHandlers(ErrorHandler)
     .lambda()
