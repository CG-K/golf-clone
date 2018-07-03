module.exports = ReservationsIntent

const getCheckReservations = require('../helpers/get-check-reservations.js')
const getUserProfile = require('../helpers/get-user-profile.js')

async function ReservationsIntent (handlerInput) {
// get the users email and then check the reservations
  let accessToken = handlerInput.requestEnvelope.context.System.user.accessToken
  try {
    let email = await getUserProfile(accessToken)
    try {
      let res = await getCheckReservations(accessToken, email)
      return handlerInput.responseBuilder
      .speak(res)
      .reprompt(res)
      .withSimpleCard('Reserved Tee Times!', res)
      .getResponse()
    } catch (error) {
      return handlerInput.responseBuilder
      .speak(error)
      .withSimpleCard('Failed to Get Reservations', error)
      .getResponse()
    }
  } catch (err) {
    return handlerInput.responseBuilder
    .speak(err)
    .withSimpleCard('Failed to Get User Profile', err)
    .getResponse()
  }
}
