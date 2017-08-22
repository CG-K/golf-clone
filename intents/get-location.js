module.exports = GetLocation

var getLatLong = require('../helpers/get-lat-long.js')
var formatDeviceAddressRequest = require('../helpers/format-device-address-request.js')
var getDeviceAddress = require('../helpers/get-device-address.js')

const ALL_ADDRESS_PERMISSION = 'read::alexa:device:all:address'
const PERMISSIONS = [ALL_ADDRESS_PERMISSION]

function GetLocation () {
  var citySlot = this.event.request.intent.slots.city
  var nearMeSlot = this.event.request.intent.slots.nearme
  var zipCodeSlot = this.event.request.intent.slots.zipcode
  var emit = this.emit
  if (citySlot.value !== undefined) {
    // we have a city convert it to lat and long
    var city = citySlot.value
    getLatLong(city, function (err, res) {
      if (err) {
        emit(':tell', err)
      }
      emit(':ask', res)
    })
  } else if (nearMeSlot.value !== undefined) {
    // we have to get device location
    var deviceId = this.event.context.System.device.deviceId
    var consentToken = this.event.context.System.user.permissions.consentToken
    if (deviceId === undefined || consentToken === undefined) {
      var askForPermissions = 'Please enable Location permissions in the Amazon Alexa app'
      emit(':tellWithPermissionCard', askForPermissions, PERMISSIONS)
    } else {
      var url = formatDeviceAddressRequest(deviceId)
      getDeviceAddress(url, consentToken, function (err, res) {
         if (err) {
           emit(':tell', err)
         }
        emit(':ask', res)
      })
    }
  } else if (zipCodeSlot.value !== undefined) {
    // we have zipcode convert it to lat and long
    var zipCode = zipCodeSlot.value
    getLatLong(zipCode, function (err, res) {
      if (err) {
        emit(':tell', err)
      }
      emit(':ask', res)
    })
  } else {
    // there was no input slot
    // Reprompt the user for a slot
    var noLocationGivenResponse = 'I need a location in order to search for a tee time ' +
    'can you please try saying Alexa, ask GolfNow to book a tee time near me?'
    var noLocationGivenReprompt = 'Please let me know what location you want to ' +
    'search tee times for.'
    emit(':ask', noLocationGivenResponse, noLocationGivenReprompt)
  }
}
