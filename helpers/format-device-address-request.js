module.exports = formatDeviceAddressRequest

function formatDeviceAddressRequest (deviceId) {
  var baseURL = 'https://api.amazonalexa.com/v1/devices/'
  var endOfURL = '/settings/address'
  var urlWithDevice = baseURL + deviceId
  var finalURL = urlWithDevice + endOfURL
  return finalURL
}
