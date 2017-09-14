// sha1-hash.js
// Purpose: a function that will gen sha1 hash the password from the user

module.exports = sha1Hash

var crypto = require('crypto')

// Purpose: a function that will gen sha1 hash the password from the user
// param(in): password: the password give to use from Golf Now
// param(out): encodedPassword: the password that is encoded in base64
// calledBy: createAuthToken()
function sha1Hash(password) {
  var Buffer = require('safe-buffer').Buffer
  console.log(password)
  var encodedPassword = crypto.createHash('sha1').update(password).digest('hex')
  console.log(encodedPassword)
  encodedPassword = Buffer.from(encodedPassword).toString('base64')
  console.log(encodedPassword)
  return encodedPassword
}
