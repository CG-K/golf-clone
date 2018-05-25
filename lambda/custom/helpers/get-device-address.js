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
async function getDeviceAddress (url, consentToken, sessionAttributes) {
  var urlOptions = {
    headers: {
      Authorization: 'Bearer ' + consentToken
    }
  }

  try {
    let response = await got(url, urlOptions)
    var parsedResponse = JSON.parse(response.body)
    try {
      let res = await formatDeviceAddressResponse(parsedResponse, sessionAttributes)
      return new Promise ((resolve, reject) => {
        resolve(res)
      })
    } catch(err) {
      return new Promise ((resolve, reject) => {
        reject(err)
      })
    }
  } catch(error) {
    console.log(error)
    var failedToGetDeviceAddress = 'We failed to get your device address, please try again!'
    return new Promise ((resolve, reject) => {
      reject(failedToGetDeviceAddress)
    })
  }
}
