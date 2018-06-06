var LaunchRequest = require('./intents/launch-request.js')
var HelpIntent = require('./intents/help-intent.js')
var StopIntent = require('./intents/stop-intent.js')
var BookTime = require('./intents/book-time.js')
var DatesReceivedIntent = require('./intents/dates-received-intent.js')
var TimeReceivedIntent = require('./intents/time-received-intent.js')
var NumberReceivedIntent = require('./intents/number-received-intent.js')
var HearOptionsIntent = require('./intents/hear-options-intent.js')
var SelectOptionsIntent = require('./intents/select-options-intent.js')
var AnyIntent = require('./intents/any-intent.js')
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
  handle(handlerInput) {
    return BookTime(handlerInput)
  },
}

const DatesReceivedIntentHandler = {
  canHandle(handlerInput) {
    let sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'DatesReceived'
      && sessionAttributes['STATE'] === states.LOCATIONMODE
  },
  handle(handlerInput) {
    return DatesReceivedIntent(handlerInput)
  },
}

const TimeReceivedIntentHandler = {
  canHandle(handlerInput) {
    let sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'TimeReceived'
      && sessionAttributes['STATE'] === states.DATESMODE
  },
  handle(handlerInput) {
    return TimeReceivedIntent(handlerInput)
  },
}

const NumberReceivedIntentHandler = {
  canHandle(handlerInput) {
    let sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
    console.log(sessionAttributes['STATE'])
    console.log(handlerInput.requestEnvelope.request.intent.name)
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'NumGolfersReceived'
      || handlerInput.requestEnvelope.request.intent.name === 'PriceReceived')
      && ((sessionAttributes['STATE'] === states.TIMEMODE)
      || (sessionAttributes['STATE'] === states.NUMGOLFERSMODE))
  },
  handle(handlerInput) {
    return NumberReceivedIntent(handlerInput)
  },
}

const AnyIntentHandler = {
    canHandle(handlerInput) {
      let sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'AnyIntent'
        && ((sessionAttributes['STATE'] === states.LOCATIONMODE)
        || (sessionAttributes['STATE'] === states.DATESMODE)
        || (sessionAttributes['STATE'] === states.TIMEMODE)
        || (sessionAttributes['STATE'] === states.NUMGOLFERSMODE))
    },
    handle(handlerInput) {
      return AnyIntent(handlerInput)
    }
}

const HearOptionsIntentHandler = {
  canHandle(handlerInput) {
    let sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'HearCourses'
      && ((sessionAttributes['STATE'] === states.HEARCOURSESMODE)
      || (sessionAttributes['STATE'] === states.HEARTEETIMESMODE)
      || (sessionAttributes['STATE'] === states.SELECTCOURSEMODE)
      || (sessionAttributes['STATE'] === states.SELECTTEETIMEMODE)
      || (sessionAttributes['STATE'] === states.PRICEMODE))
  },
  handle(handlerInput) {
    return HearOptionsIntent(handlerInput)
  },
}

const SelectOptionsIntentHandler = {
  canHandle(handlerInput) {
    let sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'SelectCourse'
      && ((sessionAttributes['STATE'] === states.HEARCOURSESMODE)
      || (sessionAttributes['STATE'] === states.HEARTEETIMESMODE)
      || (sessionAttributes['STATE'] === states.SELECTCOURSEMODE)
      || (sessionAttributes['STATE'] === states.SELECTTEETIMEMODE))
  },
  handle(handlerInput) {
    return SelectOptionsIntent(handlerInput)
  },
}

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
                         DatesReceivedIntentHandler,
                         TimeReceivedIntentHandler,
                         NumberReceivedIntentHandler,
                         AnyIntentHandler,
                         HearOptionsIntentHandler,
                         SelectOptionsIntentHandler,
                         HelpIntentHandler,
                         CancelAndStopIntentHandler,
                         SessionEndedRequestHandler)
     .addErrorHandlers(ErrorHandler)
     .withApiClient(new Alexa.DefaultApiClient())
     .lambda()
