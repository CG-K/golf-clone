// select-options-intent.js
// Purpose: to launch when the user selects a course or tee time
module.exports = SelectOptionsIntent

var states = require('../helpers/states.json')
var getNewState = require('../helpers/get-new-state.js')
var getTeeTimes = require('../helpers/get-tee-times.js')

// Purpose: to launch when the user selects a course or tee time
async function SelectOptionsIntent (handlerInput) {
  let sessionAttributes = handlerInput.attributesManager.getSessionAttributes()

  var output = ''
  var nextState = getNewState(sessionAttributes)
  sessionAttributes['STATE'] = nextState.state
  if (sessionAttributes['STATE'] === states.HEARCOURSESMODE) {
    if (handlerInput.requestEnvelope.request.intent.slots.courseNumber.value === undefined) {
      nextState = getNewState(sessionAttributes)
      sessionAttributes['STATE'] = nextState.state
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
      return handlerInput.responseBuilder
        .speak(nextState.response)
        .reprompt(nextState.reprompt)
        .withSimpleCard('Options', nextState.response)
        .getResponse()
    } else {
      sessionAttributes['courseID'] = handlerInput.requestEnvelope.request.intent.slots.courseNumber.value - 1
      nextState = getNewState(sessionAttributes)
      sessionAttributes['STATE'] = nextState.state
      output = 'You have selected: ' + sessionAttributes['courses'][sessionAttributes['courseID']]
      sessionAttributes['facilityID'] = sessionAttributes['CoursesResponse'][sessionAttributes['courseID']].facilityID
      // remove the data from CoursesResponse in order to not hit memory limit
      try {
        let res = await getTeeTimes(sessionAttributes)
        nextState = getNewState(sessionAttributes)
        sessionAttributes['STATE'] = nextState.state
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
        return handlerInput.responseBuilder
          .speak(res)
          .reprompt(res)
          .withSimpleCard('Tee Times!', res)
          .getResponse()
      } catch(err) {
        console.log(err)
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
        return handlerInput.responseBuilder
          .speak(err)
          .reprompt(err)
          .withSimpleCard('No Tee Times!', err)
          .getResponse()
      }
    }
  } else if (sessionAttributes['STATE'] === states.HEARTEETIMESMODE) {
    if (handlerInput.requestEnvelope.request.intent.slots.courseNumber.value === undefined) {
      nextState = getNewState(sessionAttributes)
      sessionAttributes['STATE'] = nextState.state
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
      return handlerInput.responseBuilder
        .speak(nextState.response)
        .reprompt(nextState.reprompt)
        .withSimpleCard('Options', nextState.response)
        .getResponse()
    } else {
      sessionAttributes['teeTimeID'] = handlerInput.requestEnvelope.request.intent.slots.courseNumber.value - 1
      nextState = getNewState(sessionAttributes)
      sessionAttributes['STATE'] = nextState.state
      output = 'You have selected: ' + sessionAttributes['teeTimes'][sessionAttributes['teeTimeID']]
      sessionAttributes['teeTimeRateID'] = sessionAttributes['TeeTimesResponse'][sessionAttributes['teeTimeID']].TeeTimeRateID
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
      return handlerInput.responseBuilder
        .speak(output)
        .reprompt(output)
        .withSimpleCard('Tee Time Rate ID', output)
        .getResponse()
    }
  }
}
