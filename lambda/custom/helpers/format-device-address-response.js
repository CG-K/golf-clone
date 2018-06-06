// format-device-address-response.js
// Purpose: To create a response from the format device address request
module.exports = formatDeviceAddressResponse

var getLatLong = require('./get-lat-long.js')

// Purpose: To create a response from the format device address request
// param(in): parsedResponse: the parsed response from the Device Address API
// param(out): callback: returns the formatted response or error to the previous function
// calledBy: getCourseSummaries()
async function formatDeviceAddressResponse (addressResponse, sessionAttributes) {
  var stateOrRegion = addressResponse.stateOrRegion
  var addressLine = addressResponse.addressLine1
  var postalCode = addressResponse.postalCode
  var codeForCountry = addressResponse.countryCode
  if (stateOrRegion === '') {
    var addressNotInUS = 'Your address is not in the United States we cannot' +
      'give tee times for places outside of the US.  Please try searching for' +
      'a tee time by saying Alexa, ask Golf Now to book a tee time in Orlando.'
      return new Promise ((resolve, reject) => {
        reject(addressNotInUS)
      })
  } else if (addressLine === null || postalCode === null || codeForCountry == null) {
    var nullResponses = 'We seem to be missing your address information in your Alexa' +
    'app.  You could go to your settings, and edit the device location with your current location.' +
    'Or you may search for a Tee Time with by saying zipcode, or city. For example: Alexa, ask Golf Now' +
    'to book a tee time in Orlando.  Or Alexa, ask Golf Now to book a tee time near 3 2 8 1 9.'
    return new Promise ((resolve, reject) => {
      reject(nullResponses)
    })
  } else {
    var location = {
      address: addressLine,
      zipcode: postalCode,
      countryCode: codeForCountry
    }
    try {
      let res = await getLatLong(location, sessionAttributes)
      return new Promise ((resolve, reject) => {
        resolve(res)
      })
    } catch (err) {
      return new Promise ((resolve, reject) => {
        reject(res)
      })
    }
  }
}
