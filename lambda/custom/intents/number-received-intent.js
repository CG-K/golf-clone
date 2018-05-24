// number-received-intent.js
// Purpose: a function that handles the num golfers or price intent
module.exports = NumberReceivedIntent

var states = require('../helpers/states.json')
var getNewState = require('../helpers/get-new-state.js')
var getCourseSummaries = require('../helpers/get-course-summaries.js')

const MAX_GOLFERS = 4
const NO_GOLFERS = 0

// Purpose: a function that handles the num golfers or price intent
function NumberReceivedIntent () {
  let sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
  var nextState
  if (this.handler.state === states.TIMEMODE) {
    if (handlerInput.requestEnvelope.request.intent.slots.golfersPrice.value === undefined) {
      nextState = getNewState()
      sessionAttributes['STATE'] = nextState.state
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
      return handlerInput.responseBuilder
        .speak(nextState.response)
        .reprompt(nextState.reprompt)
        .withSimpleCard('Booking a Tee Time', nextState.response)
        .getResponse()
    } else {
      if (handlerInput.requestEnvelope.request.intent.slots.golfersPrice.value > MAX_GOLFERS || handlerInput.requestEnvelope.request.intent.slots.golfersPrice.value < NO_GOLFERS) {
        var outOfNumGolferRange = 'We cannot search for ' + handlerInput.requestEnvelope.request.intent.slots.golfersPrice.value + '. You can search for 1, 2, 3, 4, or any number of golfers.'
        var outOfNumGolferRangeReprompt = 'You can search for 1, 2, 3, 4, or any number of golfers.'
          // go back in state because information was not gathered properly
        sessionAttributes['STATE'] = states.TIMEMODE
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
        return handlerInput.responseBuilder
          .speak(outOfNumGolferRange)
          .reprompt(outOfNumGolferRangeReprompt)
          .withSimpleCard('Booking a Tee Time', outOfNumGolferRange)
          .getResponse()
      } else {
        sessionAttributes['numGolfers'] = handlerInput.requestEnvelope.request.intent.slots.golfersPrice.value
        nextState = getNewState()
        sessionAttributes['STATE'] = states.TIMEMODE
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
        if (sessionAttributes['STATE'] === states.PRICEMODE) {
          getCourseSummaries(sessionAttributes, function (err, res) {
            if (err) {
              console.log(err)
              handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
              return handlerInput.responseBuilder
                .speak(err)
                .reprompt(err)
                .withSimpleCard('No courses!', err)
                .getResponse()
            }
            nextState = getNewState()
            sessionAttributes['STATE'] = nextState.state
            handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
            return handlerInput.responseBuilder
              .speak(res)
              .reprompt(res)
              .withSimpleCard('Select a Course!', res)
              .getResponse()
          })
        } else {
          handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
          return handlerInput.responseBuilder
            .speak(nextState.response)
            .reprompt(nextState.reprompt)
            .withSimpleCard('Booking a Tee Time', nextState.response)
            .getResponse()
        }
      }
    }
  } else if (sessionAttributes['STATE'] === states.NUMGOLFERSMODE) {
    if (handlerInput.requestEnvelope.request.intent.slots.golfersPrice.value === undefined) {
      nextState = getNewState()
      sessionAttributes['STATE'] = nextState.state
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
      return handlerInput.responseBuilder
        .speak(nextState.response)
        .reprompt(nextState.reprompt)
        .withSimpleCard('Booking a Tee Time', nextState.response)
        .getResponse()
    } else {
      sessionAttributes['price'] = handlerInput.requestEnvelope.request.intent.slots.golfersPrice.value
      nextState = getNewState()
      sessionAttributes['STATE'] = nextState.state
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
      if (sessionAttributes['STATE'] === states.PRICEMODE) {
        getCourseSummaries(sessionAttributes, function (err, res) {
          if (err) {
            console.log(err)
            handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
            return handlerInput.responseBuilder
              .speak(err)
              .reprompt(err)
              .withSimpleCard('No courses!', err)
              .getResponse()
          }
          nextState = getNewState()
          sessionAttributes['STATE'] = nextState.state
          handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
          return handlerInput.responseBuilder
            .speak(res)
            .reprompt(res)
            .withSimpleCard('Select a Course!', res)
            .getResponse()
        })
      } else {
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
        return handlerInput.responseBuilder
          .speak(nextState.response)
          .reprompt(nextState.reprompt)
          .withSimpleCard('Booking a Tee Time', nextState.response)
          .getResponse()
      }
    }
  }
}
