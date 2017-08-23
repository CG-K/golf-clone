// format-device-address-response.js
// Purpose: To get the address information from user
module.exports = getDeviceAddress

const got = require('got')
var formatDeviceAddressResponse = require('./format-device-address-response.js')

// Purpose: To get the address information from user
// param(in): url: url to Device Address API
// param(in): consentToken: token from Amazon that allows permissions
// param(out): callback: returns the data or error message to who called it
// calledBy:  GetLocation()
function getDeviceAddress (url, consentToken, callback) {
  var urlOptions = {
    headers: {
      Authorization: 'Bearer ' + consentToken
    }
  }

  got(url, urlOptions)
    .then(response => {
      var parsedResponse = JSON.parse(response.body)
      formatDeviceAddressResponse(parsedResponse, function (err, res) {
        if (err) {
          callback(err)
        }
        callback(null, res)
      })
    })
    .catch(error => {
      console.log(error)
      var failedToGetDeviceAddress = 'We failed to get your device address, please try again!'
      callback(failedToGetDeviceAddress)
    })
}
