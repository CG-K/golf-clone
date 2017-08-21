module.exports = formatDeviceAddressResponse

function formatDeviceAddressResponse(parsedResponse, callback) {
  var stateOrRegion = parsedResponse.stateOrRegion
  if(stateOrRegion === '') {
    var addressNotInUS = 'Your address is not in the United States we cannot' +
      'give tee times for places outside of the US.  Please try searching for' +
      'a tee time by saying Alexa, ask Golf Now to book a tee time in Orlando.'
    callback(addressNotInUS)
  }
  var city = parsedResponse.city
  var addressLine = parsedResponse.addressLine1
  var outputSpeech = 'We have the location for: ' + addressLine + ', ' + city +
    ', ' + stateOrRegion
  callback(null, outputSpeech)
}
