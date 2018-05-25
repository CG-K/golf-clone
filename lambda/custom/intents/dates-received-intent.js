// dates-received-intent.js
// Purpose: a function that handles the dates recevied intent
module.exports = DatesReceivedIntent

var states = require('../helpers/states.json')
var getNewState = require('../helpers/get-new-state.js')
var getCourseSummaries = require('../helpers/get-course-summaries.js')

// Purpose: saves the date of Golfers given by the user and prompts for more information
// function DatesReceivedIntent (handlerInput) {
//   let sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
//
//   var nextState
//   if (handlerInput.requestEnvelope.request.intent.slots.dateToPlay.value === undefined) {
//     nextState = getNewState(sessionAttributes)
//     sessionAttributes['STATE'] = nextState.state
//     handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
//     return handlerInput.responseBuilder
//       .speak(nextState.response)
//       .reprompt(nextState.reprompt)
//       .withSimpleCard('Booking a Tee Time', nextState.response)
//       .getResponse()
//   } else {
//     sessionAttributes['date'] = handlerInput.requestEnvelope.request.intent.slots.dateToPlay.value
//     nextState = getNewState()
//     sessionAttributes['STATE'] = nextState.state
//     handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
//
//     if (sessionAttributes['STATE'] === states.PRICEMODE) {
//       getCourseSummaries(sessionAttributes, function (err, res) {
//         if (err) {
//           console.log(err)
//           handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
//           return handlerInput.responseBuilder
//             .speak(err)
//             .reprompt(err)
//             .withSimpleCard('No courses!', err)
//             .getResponse()
//         }
//         console.log(res)
//         nextState = getNewState()
//         sessionAttributes['STATE'] = nextState.state
//         handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
//         return handlerInput.responseBuilder
//           .speak(res)
//           .reprompt(res)
//           .withSimpleCard('Select a Course!', res)
//           .getResponse()
//       })
//     } else {
//       handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
//       return handlerInput.responseBuilder
//         .speak(nextState.response)
//         .reprompt(nextState.reprompt)
//         .withSimpleCard('Booking a Tee Time', nextState.response)
//         .getResponse()
//     }
//   }
// }

async function DatesReceivedIntent (handlerInput) {
  console.log('in dates intent')
  console.log(JSON.stringify(handlerInput))
  let sessionAttributes = handlerInput.attributesManager.getSessionAttributes()

  var nextState
  if (handlerInput.requestEnvelope.request.intent.slots.dateToPlay.value === undefined) {
    nextState = getNewState(sessionAttributes)
    sessionAttributes['STATE'] = nextState.state
    handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
    return handlerInput.responseBuilder
      .speak(nextState.response)
      .reprompt(nextState.reprompt)
      .withSimpleCard('Booking a Tee Time', nextState.response)
      .getResponse()
  } else {
    sessionAttributes['date'] = handlerInput.requestEnvelope.request.intent.slots.dateToPlay.value
    nextState = getNewState(sessionAttributes)
    sessionAttributes['STATE'] = nextState.state
    handlerInput.attributesManager.setSessionAttributes(sessionAttributes)

    if (sessionAttributes['STATE'] === states.PRICEMODE) {
      try {
        let res = await getCourseSummaries(sessionAttributes)
        console.log(res)
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
