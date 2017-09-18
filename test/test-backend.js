var chai = require('chai')
var assert = chai.assert

var getLatLong = require('../helpers/get-lat-long.js')
// var createAuthToken = require('../create-auth-token.js')
var formatDeviceAddressResponse = require('../helpers/format-device-address-response.js')

describe('getLatLong Tests', function () {
  it('Takes a City and Gives Lat and Long', function () {
    var location = 'Orlando'
    getLatLong(location, function (err, res) {
      if (err) {
        console.log(err)
      }
      assert.equal(res.latLongOutput, 'What day would you like to play?')
      assert.equal(res.latLongReprompt, 'Tell me what day you would like to play, you can say things like today, tomorrow, Next Tuesday.')
    })
  })

  it('Takes a Zip Code and Gives Lat and Long', function () {
    var location = '32819'
    getLatLong(location, function (err, res) {
      if (err) {
        console.log(err)
      }
      assert.equal(res.latLongOutput, 'What day would you like to play?')
      assert.equal(res.latLongReprompt, 'Tell me what day you would like to play, you can say things like today, tomorrow, Next Tuesday.')
    })
  })
  it('Takes a Bad String and Handles the Error', function () {
    var location = 'thisMakesNo Sense'
    getLatLong(location, function (err, res) {
      if (err) {
        console.log(err)
      }
      assert.equal(err, 'We have failed to get the latitude and longitude from ' +
      'the given location, can you try again?')
    })
  })
  it('Takes a Empty String and Handles the Error', function () {
    var location = ''
    getLatLong(location, function (err, res) {
      if (err) {
        console.log(err)
      }
      assert.equal(err, 'We have failed to get the latitude and longitude from ' +
      'the given location, can you try again?')
    })
  })
})

/*
describe('createAuthToken Tests', function () {
  it('creates an auth token properly', function () {
    var token = createAuthToken()
    assert.equal(token, '')
  })
})
*/

describe('formatDeviceAddressResponse Tests', function () {
  var deviceAdddressResponse = {
    stateOrRegion : 'WA',
    city : 'Seattle',
    countryCode : 'US',
    postalCode : '98109',
    addressLine1 : '410 Terry Ave North',
    addressLine2 : '',
    addressLine3 : 'aeiou',
    districtOrCounty : ''
  }

  it('Tests with a full address given', function () {
    formatDeviceAddressResponse(deviceAdddressResponse, function (err, res) {
      if (err) {
        console.log(err)
      }
      assert.equal(res.latLongOutput, 'What day would you like to play?')
      assert.equal(res.latLongReprompt, 'Tell me what day you would like to play, you can say things like today, tomorrow, Next Tuesday.')
    })
  })

  it('Tests with no state or region given', function () {
    deviceAdddressResponse.stateOrRegion = ''
    formatDeviceAddressResponse(deviceAdddressResponse, function (err, res) {
      if (err) {
        console.log(err)
      }
      assert.equal(err, 'Your address is not in the United States we cannot' +
        'give tee times for places outside of the US.  Please try searching for' +
        'a tee time by saying Alexa, ask Golf Now to book a tee time in Orlando.')
    })
  })
  it('Tests with a null address', function () {
    deviceAdddressResponse.stateOrRegion = 'WA'
    deviceAdddressResponse.addressLine1 = null
    formatDeviceAddressResponse(deviceAdddressResponse, function (err, res) {
      if (err) {
        console.log(err)
      }
      assert.equal(err, 'We seem to be missing your address information in your Alexa' +
      'app.  You could go to your settings, and edit the device location with your current location.' +
      'Or you may search for a Tee Time with by saying zipcode, or city. For example: Alexa, ask Golf Now' +
      'to book a tee time in Orlando.  Or Alexa, ask Golf Now to book a tee time near 3 2 8 1 9.')
    })
  })
  it('Tests with a null postal code', function () {
    deviceAdddressResponse.postalCode = null
    formatDeviceAddressResponse(deviceAdddressResponse, function (err, res) {
      if (err) {
        console.log(err)
      }
      assert.equal(err, 'We seem to be missing your address information in your Alexa' +
      'app.  You could go to your settings, and edit the device location with your current location.' +
      'Or you may search for a Tee Time with by saying zipcode, or city. For example: Alexa, ask Golf Now' +
      'to book a tee time in Orlando.  Or Alexa, ask Golf Now to book a tee time near 3 2 8 1 9.')
    })
  })
  it('Tests with a null code for country', function () {
    deviceAdddressResponse.countryCode = null
    formatDeviceAddressResponse(deviceAdddressResponse, function (err, res) {
      if (err) {
        console.log(err)
      }
      assert.equal(err, 'We seem to be missing your address information in your Alexa' +
      'app.  You could go to your settings, and edit the device location with your current location.' +
      'Or you may search for a Tee Time with by saying zipcode, or city. For example: Alexa, ask Golf Now' +
      'to book a tee time in Orlando.  Or Alexa, ask Golf Now to book a tee time near 3 2 8 1 9.')
    })
  })
})
