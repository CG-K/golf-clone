// time-received-intent.js
// Purpose: a function that handles the time recevied intent
module.exports = TimeReceivedIntent

var states = require('../helpers/states.json')
var getNewState = require('../helpers/get-new-state.js')
var getCourseSummaries = require('../helpers/get-course-summaries.js')
const checkValidTime = require('../helpers/check-valid-time.js')

// Purpose: saves the time given by the user and reprompts for more info
async function TimeReceivedIntent (handlerInput) {
  let sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
  var nextState
  if (handlerInput.requestEnvelope.request.intent.slots.timeToPlay.value === undefined) {
    nextState = getNewState(sessionAttributes)
    sessionAttributes['STATE'] = nextState.state
    handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
    return handlerInput.responseBuilder
      .speak(nextState.response)
      .reprompt(nextState.reprompt)
      .withSimpleCard('Booking a Tee Time', nextState.response)
      .getResponse()
  } else {
    let time = handlerInput.requestEnvelope.request.intent.slots.timeToPlay.value
    let isValidTime = checkValidTime(time)
    if (!isValidTime) {
      var timeOutOfRange = 'We cannot search for ' + time + '. You can search for anything between 6:00 AM and 6:00 PM.'
      var timeOutOfRangeReprompt = 'You can search for anything between 6:00 AM and 6:00 PM.'
        // go back in state because information was not gathered properly
      sessionAttributes['STATE'] = states.DATESMODE
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
      return handlerInput.responseBuilder
        .speak(timeOutOfRange)
        .reprompt(timeOutOfRangeReprompt)
        .withSimpleCard('Booking a Tee Time', timeOutOfRange)
        .getResponse()
    }
    sessionAttributes['time'] = time
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
      } catch (err) {
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
