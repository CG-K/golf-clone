// get-location.js
// Purpose: a function that a user starts when they say 'book a tee time {location}'
//  it is meant to ultimately get course summaries from your location
//  depending on which form of location you give it, it will take you down a different route
module.exports = BookTime

var getLatLong = require('../helpers/get-lat-long.js')
var formatDeviceAddressRequest = require('../helpers/format-device-address-request.js')
var getDeviceAddress = require('../helpers/get-device-address.js')
var states = require('../helpers/states.json')
var getNewState = require('../helpers/get-new-state.js')
var clearOptions = require('../helpers/clear-options.js')
var initializeSessionAttributes = require('../helpers/initialize-session-attributes.js')
const ALL_ADDRESS_PERMISSION = 'read::alexa:device:all:address'
const PERMISSIONS = [ALL_ADDRESS_PERMISSION]

async function BookTime (handlerInput) {

  console.log('In book time: ' + JSON.stringify(handlerInput))
  // ar options = require('../helpers/course-summary-options.json')
  clearOptions(handlerInput)
  // if all of them have values?
  let sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
  sessionAttributes = initializeSessionAttributes(sessionAttributes)
  if (handlerInput.requestEnvelope.request.intent.slots.city.value !== undefined && handlerInput.requestEnvelope.request.intent.slots.zipcode.value !== undefined && handlerInput.requestEnvelope.request.intent.slots.nearme.value !== undefined) {
    // let sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
    var nextState = getNewState(sessionAttributes)
    console.log(handlerInput.requestEnvelope.request.intent.name)
    sessionAttributes['STATE'] = nextState.state
    handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
    return handlerInput.responseBuilder
      .speak(nextState.response)
      .reprompt(nextState.reprompt)
      .withSimpleCard('Booking a Tee Time', nextState.response)
      .getResponse()
  } else {
    sessionAttributes['STATE'] = states.LOCATIONMODE
    // var handler = this.handler
    var citySlot = handlerInput.requestEnvelope.request.intent.slots.city
    var nearMeSlot = handlerInput.requestEnvelope.request.intent.slots.nearme
    var zipCodeSlot = handlerInput.requestEnvelope.request.intent.slots.zipcode
    var dealTypeSlot = handlerInput.requestEnvelope.request.intent.slots.dealType
    if (handlerInput.requestEnvelope.request.intent.slots.dateToPlay.value !== undefined) {
      var dateToPlay = handlerInput.requestEnvelope.request.intent.slots.dateToPlay.value
      sessionAttributes['date'] = dateToPlay
    }
    if (handlerInput.requestEnvelope.request.intent.slots.timeToPlay.value !== undefined) {
      var timeToPlay = handlerInput.requestEnvelope.request.intent.slots.timeToPlay.value
      sessionAttributes['time'] = timeToPlay
    }
    if (handlerInput.requestEnvelope.request.intent.slots.value !== undefined) {
      var numberOfGolfers = handlerInput.requestEnvelope.request.intent.slots.value
      sessionAttributes['numGolfers'] = numberOfGolfers
    }
    if (handlerInput.requestEnvelope.request.intent.slots.amountOfDollars.value !== undefined) {
      var amountOfDollars = handlerInput.requestEnvelope.request.intent.slots.amountOfDollars.value
      sessionAttributes['price'] = amountOfDollars
    }
    sessionAttributes['dealType'] = dealTypeSlot.value
    if (citySlot.value !== undefined) {
      // we have a city convert it to lat and long
      var city = citySlot.value
      try {
        let result = await getLatLong(city, sessionAttributes)
        console.log('we were given result: ', result)
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
        return handlerInput.responseBuilder
          .speak(result.latLongOutput)
          .reprompt(result.latLongReprompt)
          .withSimpleCard('Book a Tee Time', result.latLongOutput)
          .getResponse()
      } catch (err) {
        console.log('we were given error: ', err)
        return handlerInput.responseBuilder
          .speak(err)
          .withSimpleCard('Book a Tee Time', err)
          .getResponse()
      }
    } else if (nearMeSlot.value !== undefined) {
      // we have to get device location
      var deviceId = handlerInput.requestEnvelope.context.System.device.deviceId
      var consentToken = handlerInput.requestEnvelope.context.System.user.permissions.consentToken
      if (deviceId === undefined || consentToken === undefined) {
        var askForPermissions = 'Please enable Location permissions in the Amazon Alexa app'
        return handlerInput.responseBuilder
          .speak(askForPermissions)
          .withAskForPermissionsConsentCard(PERMISSIONS)
          .getResponse()
      } else {
        var url = formatDeviceAddressRequest(deviceId)
        getDeviceAddress(url, consentToken, sessionAttributes, function (err, res) {
          if (err) {
            return handlerInput.responseBuilder
              .speak(err)
              .withSimpleCard('Something Went Wrong', err)
              .getResponse()
          }
          sessionAttributes = res.sessionAttributes
          sessionAttributes['STATE'] = res.state
          console.log(res.state)
          console.log(sessionAttributes)
          handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
          console.log(JSON.stringify(handlerInput))
          return handlerInput.responseBuilder
            .speak(res.latLongOutput)
            .reprompt(res.latLongReprompt)
            .withSimpleCard('Booking a Tee Time', res.latLongOutput)
            .getResponse()
        })
      }
    } else if (zipCodeSlot.value !== undefined) {
      // we have zipcode convert it to lat and long
      var zipCode = zipCodeSlot.value
      try {
        let result = await getLatLong(zipCode, sessionAttributes)
        console.log('we were given result: ', result)
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
        return handlerInput.responseBuilder
          .speak(result.latLongOutput)
          .reprompt(result.latLongReprompt)
          .withSimpleCard('Book a Tee Time', result.latLongOutput)
          .getResponse()
      } catch (err) {
        console.log('we were given error: ', err)
        return handlerInput.responseBuilder
          .speak(err)
          .withSimpleCard('Something Went Wrong', err)
          .getResponse()
      }
    } else {
      // there was no input slot
      // Reprompt the user for a slot
      var noLocationGivenResponse = 'I need a location in order to search for a tee time ' +
      'can you please try saying Alexa, ask GolfNow to book a tee time near me?'
      var noLocationGivenReprompt = 'Please let me know what location you want to ' +
      'search tee times for.'
      return handlerInput.responseBuilder
        .speak(noLocationGivenResponse)
        .reprompt(noLocationGivenReprompt)
        .withSimpleCard('Booking a Tee Time', noLocationGivenResponse)
        .getResponse()
    }
  }
}
