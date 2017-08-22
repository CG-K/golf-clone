module.exports = getDeviceAddress

const got = require('got')
var formatDeviceAddressResponse = require('./format-device-address-response.js')

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
