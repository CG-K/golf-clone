// hmac-256.js
// Purpose: a function that will gen sha1 hash the password from the user

module.exports = hmac256

var crypto = require('crypto')

// Purpose: a function that will gen sha1 hash the password from the user
// param(in/out): authHeader: the auth header that contains the username, password, and timestamp, will return with hmac-256 and base64 encoded
// param(in): clientSecret: the client application secret
// calledBy: createAuthToken()
function hmac256(authHeader, clientSecret) {
  console.log(authHeader)
  console.log('client secret in hmac256: ' + clientSecret)
  /*var hmac = crypto.createHmac('sha256', clientSecret)
  console.log(hmac)
  var updatedHeader = hmac.update(authHeader)
  console.log(updatedHeader)
  var outputHeader = hmac.digest('base64')
  // authHeader = crypto.createHmac('sha256', clientSecret).update(authHeader).digest('base64')
  // console.log(authHeader)
  // authHeader = Buffer.from(authHeader).toString('base64')
  console.log(outputHeader)
  return outputHeader
  */
  authHeader = crypto.createHmac('sha256', clientSecret).update(authHeader).digest('base64')
  console.log(authHeader)
  return authHeader
}
