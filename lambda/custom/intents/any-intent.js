module.exports = AnyIntent

const states = require('../helpers/states.json')
var getNewState = require('../helpers/get-new-state.js')
var getCourseSummaries = require('../helpers/get-course-summaries.js')

async function AnyIntent (handlerInput) {
  let sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
  if (sessionAttributes['STATE'] === states.LOCATIONMODE) {
    var todaysFullDate = new Date()
    var todaysFullDateSplit = todaysFullDate.toString().split('T')
    var todaysDate = todaysFullDateSplit[0]
    sessionAttributes['date'] = todaysDate // todays date YYYY-MM-DD
  } else if (sessionAttributes['STATE'] === states.DATESMODE) {
    sessionAttributes['time'] = 'any'
  } else if (sessionAttributes['STATE'] === states.TIMEMODE) {
    sessionAttributes['numGolfers'] = 'any'
  } else if (sessionAttributes['STATE'] === states.NUMGOLFERSMODE) {
    sessionAttributes['price'] = 'any'
  }

  var newState = getNewState(sessionAttributes)
  sessionAttributes['STATE'] = newState.state
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
    newState.response = 'Ok, any option. '  + newState.response
    handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
    return handlerInput.responseBuilder
      .speak(newState.response)
      .reprompt(newState.reprompt)
      .withSimpleCard('Booking a Tee Time', newState.response)
      .getResponse()
  }
}
