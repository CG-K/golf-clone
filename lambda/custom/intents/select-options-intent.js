// select-options-intent.js
// Purpose: to launch when the user selects a course or tee time
module.exports = SelectOptionsIntent

var states = require('../helpers/states.json')
var getNewState = require('../helpers/get-new-state.js')
var getTeeTimes = require('../helpers/get-tee-times.js')

// Purpose: to launch when the user selects a course or tee time
function SelectOptionsIntent (handlerInput) {
  var options = require('../helpers/course-summary-options.json')
  let sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
  var output = ''
  var nextState = getNewState()
  sessionAttributes['STATE'] = nextState.state
  console.log('We are in select options with the state: ' + sessionAttributes['STATE'])
  if (sessionAttributes['STATE'] === states.HEARCOURSESMODE) {
    if (handlerInput.requestEnvelope.request.intent.slots.optionNumber.value === undefined) {
      nextState = getNewState()
      console.log(handlerInput.requestEnvelope.request.intent.name)
      console.log('courseNumber is undefined.  the next state is: ' + nextState.state)
      sessionAttributes['STATE'] = nextState.state
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
      return handlerInput.responseBuilder
        .speak(nextState.response)
        .reprompt(nextState.reprompt)
        .withSimpleCard('Options', nextState.response)
        .getResponse()
    } else {
      sesionAttributes['courseID'] = handlerInput.requestEnvelope.request.intent.slots.optionNumber.value - 1
      nextState = getNewState()
      sessionAttributes['STATE'] = nextState.state
      output = 'You have selected: ' + sesionAttributes['courses'][sesionAttributes['courseID']]
      sessionAttributes['facilityID'] = sesionAttributes['CoursesResponse'].Items[sessionAttributes['courseID']].ID
      getTeeTimes(sessionAttributes, function (err, res) {
        if (err) {
          console.log(err)
          handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
          return handlerInput.responseBuilder
            .speak(err)
            .reprompt(err)
            .withSimpleCard('No courses!', err)
            .getResponse()
        }
        console.log(res)
        nextState = getNewState()
        sessionAttributes['STATE'] = nextState.state
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
        return handlerInput.responseBuilder
          .speak(res)
          .reprompt(res)
          .withSimpleCard('Courses!', res)
          .getResponse()
      })
    }
  } else if (sessionAttributes['STATE'] === states.HEARTEETIMESMODE) {
    if (handlerInput.requestEnvelope.request.intent.slots.optionNumber.value === undefined) {
      nextState = getNewState()
      console.log(handlerInput.requestEnvelope.request.intent.name)
      console.log('teeTime is undefined.  the next state is: ' + nextState.state)
      sessionAttributes['STATE'] = nextState.state
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
      return handlerInput.responseBuilder
        .speak(nextState.response)
        .reprompt(nextState.reprompt)
        .withSimpleCard('Options', nextState.response)
        .getResponse()
    } else {
      sessionAttributes['teeTimeID'] = handlerInput.requestEnvelope.request.intent.slots.optionNumber.value
      nextState = getNewState()
      sessionAttributes['STATE'] = nextState.state
      output = 'You have selected: ' + sessionAttributes['teeTimes'][sessionAttributes['teeTimeID']]
      sessionAttributes['teeTimeRateID'] = sessionAttributes['TeeTimesResponse'].TeeTimes[sessionAttributes['teeTimeID']].DisplayRate.TeeTimeRateID
      console.log(sessionAttributes['teeTimeRateID'])
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
      return handlerInput.responseBuilder
        .speak(output)
        .reprompt(output)
        .withSimpleCard('Tee Time Rate ID', output)
        .getResponse()
    }
  }
}
