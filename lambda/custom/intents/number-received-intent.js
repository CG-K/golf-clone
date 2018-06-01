// number-received-intent.js
// Purpose: a function that handles the num golfers or price intent
module.exports = NumberReceivedIntent

var states = require('../helpers/states.json')
var getNewState = require('../helpers/get-new-state.js')
var getCourseSummaries = require('../helpers/get-course-summaries.js')

const MAX_GOLFERS = 3
const NO_GOLFERS = 0

// Purpose: a function that handles the num golfers or price intent
async function NumberReceivedIntent (handlerInput) {
  let sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
  console.log('In NumberReceivedIntent: ', JSON.stringify(sessionAttributes))
  console.log(JSON.stringify(handlerInput))
  var nextState
  if (sessionAttributes['STATE'] === states.TIMEMODE) {
    let numGolfersSlot = handlerInput.requestEnvelope.request.intent.slots.numberOfGolfers
    if (numGolfersSlot !== undefined && numGolfersSlot.value === undefined) {
      nextState = getNewState(sessionAttributes)
      sessionAttributes['STATE'] = nextState.state
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
      return handlerInput.responseBuilder
        .speak(nextState.response)
        .reprompt(nextState.reprompt)
        .withSimpleCard('Booking a Tee Time', nextState.response)
        .getResponse()
    } else {
      if (numGolfersSlot.value > MAX_GOLFERS || numGolfersSlot.value < NO_GOLFERS) {
        var outOfNumGolferRange = 'We cannot search for ' + numGolfersSlot.value + '. You can search for 1, 2, 3 or any number of golfers.'
        var outOfNumGolferRangeReprompt = 'You can search for 1, 2, 3 or any number of golfers.'
          // go back in state because information was not gathered properly
        sessionAttributes['STATE'] = states.TIMEMODE
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
        return handlerInput.responseBuilder
          .speak(outOfNumGolferRange)
          .reprompt(outOfNumGolferRangeReprompt)
          .withSimpleCard('Booking a Tee Time', outOfNumGolferRange)
          .getResponse()
      } else {
        sessionAttributes['numGolfers'] = numGolfersSlot.value
        nextState = getNewState(sessionAttributes)
        sessionAttributes['STATE'] = nextState.state
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
        if (sessionAttributes['STATE'] === states.PRICEMODE) {
          try {
            let res = await getCourseSummaries(sessionAttributes)
            nextState = getNewState(sessionAttributes)
            sessionAttributes['STATE'] = nextState.state
            handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
            return handlerInput.responseBuilder
              .speak(res)
              .reprompt(res)
              .withSimpleCard('Select a Course!', res)
              .getResponse()
          } catch(err) {
            console.log(err)
            handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
            return handlerInput.responseBuilder
              .speak(err)
              .reprompt(err)
              .withSimpleCard('No courses!', err)
              .getResponse()
          }
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
    let golfPriceSlot = handlerInput.requestEnvelope.request.intent.slots.amountOfDollars
    if (golfPriceSlot !== undefined && golfPriceSlot.value === undefined) {
      nextState = getNewState(sessionAttributes)
      sessionAttributes['STATE'] = nextState.state
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
      return handlerInput.responseBuilder
        .speak(nextState.response)
        .reprompt(nextState.reprompt)
        .withSimpleCard('Booking a Tee Time', nextState.response)
        .getResponse()
    } else {
      sessionAttributes['price'] = golfPriceSlot.value
      nextState = getNewState(sessionAttributes)
      sessionAttributes['STATE'] = nextState.state
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
      console.log(JSON.stringify(handlerInput))
      console.log(sessionAttributes)
      if (sessionAttributes['STATE'] === states.PRICEMODE) {
        try {
          let res = await getCourseSummaries(sessionAttributes)
          nextState = getNewState(sessionAttributes)
          sessionAttributes['STATE'] = nextState.state
          handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
          return handlerInput.responseBuilder
            .speak(res)
            .reprompt(res)
            .withSimpleCard('Select a Course!', res)
            .getResponse()
        } catch(err) {
          console.log(err)
          handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
          return handlerInput.responseBuilder
            .speak(err)
            .reprompt(err)
            .withSimpleCard('No courses!', err)
            .getResponse()
        }
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
