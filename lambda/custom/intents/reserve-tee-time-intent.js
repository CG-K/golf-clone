module.exports = ReserveTeeTimeIntent

const bookTeeTime = require('../helpers/book-tee-time.js')
const getPaymentInfo = require('../helpers/get-payment-info.js')

// meant to actually do the tee time booking
async function ReserveTeeTimeIntent (handlerInput) {
  let sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
  let accessToken = handlerInput.requestEnvelope.context.System.user.accessToken
  try {
    let paymentInformation = await getPaymentInfo(sessionAttributes, accessToken)
    try {
      let res = await bookTeeTime(sessionAttributes, accessToken, paymentInfomation)
      // let res = await bookTeeTime(sessionAttributes, accessToken)
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
      return handlerInput.responseBuilder
      .speak(res)
      .reprompt(res)
      .withSimpleCard('Tee Time Booked!', res)
      .getResponse()
    } catch (error) {
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
      return handlerInput.responseBuilder
      .speak(error)
      .withSimpleCard('Booking Failed', error)
      .getResponse()
    }
  } catch (err) {
    handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
    return handlerInput.responseBuilder
    .speak(err)
    .withSimpleCard('Booking Failed', err)
    .getResponse()
  }
}
