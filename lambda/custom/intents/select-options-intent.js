// select-options-intent.js
// Purpose: to launch when the user selects a course or tee time
module.exports = SelectOptionsIntent

var states = require('../helpers/states.json')
var getNewState = require('../helpers/get-new-state.js')
var getTeeTimes = require('../helpers/get-tee-times.js')
const getUserProfile = require('../helpers/get-user-profile.js')
const getTeeTimeInvoice = require('../helpers/get-tee-time-invoice.js')

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
      sessionAttributes['courseName'] = sessionAttributes['CoursesResponse'][sessionAttributes['courseID']].name
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
      // we need to check to see if the user is authenticated with an access token from OAuth
      let accessToken = handlerInput.requestEnvelope.context.System.user.accessToken
      console.log(accessToken)
      if (accessToken === undefined) {
        var noAccessToken = "You must have a Golf Now account to book a tee time or hot deal. " +
            "Please use the Alexa app to link your Amazon account " +
            "with your Golf Now Account."
      return handlerInput.responseBuilder
          .speak(noAccessToken)
          .withLinkAccountCard()
          .getResponse();
      } else {
        sessionAttributes['teeTimeID'] = handlerInput.requestEnvelope.request.intent.slots.courseNumber.value - 1
        sessionAttributes['teeTimeRateID'] = sessionAttributes['TeeTimesResponse'][sessionAttributes['teeTimeID']].TeeTimeRateID
        try {
          let email = await getUserProfile(accessToken)
          sessionAttributes['email'] = email
          console.log(email)
          try {
            let res =  await getTeeTimeInvoice(accessToken, email, sessionAttributes)
            sessionAttributes['STATE'] = states.BOOKTEETIMEMODE
            sessionAttributes['teeTimeInvoice'] = res.invoice
            handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
            return handlerInput.responseBuilder
            .speak(res.invoiceResponse)
            .reprompt(res.invoiceResponse)
            .withSimpleCard('Tee Time Invoice', res.invoiceResponse)
            .getResponse()
          } catch (err) {
            handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
            return handlerInput.responseBuilder
            .speak(err)
            .withSimpleCard('No Final Tee Time', err)
            .getResponse()
          }
        } catch (error) {
          return handlerInput.responseBuilder
          .speak(error)
          .withSimpleCard('No Email!', error)
          .getResponse()
        }
      }

    }
  }
}
