module.exports = formatDeviceAddressResponse

var getLatLong = require('./get-lat-long.js')

function formatDeviceAddressResponse (parsedResponse, callback) {
  var stateOrRegion = parsedResponse.stateOrRegion
  if (stateOrRegion === '') {
    var addressNotInUS = 'Your address is not in the United States we cannot' +
      'give tee times for places outside of the US.  Please try searching for' +
      'a tee time by saying Alexa, ask Golf Now to book a tee time in Orlando.'
    callback(addressNotInUS)
  }
  // var city = parsedResponse.city
  var output = JSON.stringify(parsedResponse)
  console.log(output)
  var location = {
    address: parsedResponse.addressLine1,
    zipcode: parsedResponse.postalCode,
    countryCode: parsedResponse.countryCode
  }
  getLatLong(location, function (err, res) {
    if (err) {
      callback(err)
    }
    callback(null, res)
  })
}
