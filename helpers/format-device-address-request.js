// format-device-address-request.js
// Purpose: To create a URL to get Device Address from the user
module.exports = formatDeviceAddressRequest

// Purpose: To create a URL to get Device Address from the user
// param(in): deviceId: specific device Id for your alexa device
// param(out): finalURL: returns the formatted URL with all the data for the request
// calledBy: getCourseSummaries()
function formatDeviceAddressRequest (deviceId) {
  var baseURL = 'https://api.amazonalexa.com/v1/devices/'
  var endOfURL = '/settings/address'
  var urlWithDevice = baseURL + deviceId
  var finalURL = urlWithDevice + endOfURL
  return finalURL
}
