// create-auth-token.js
// Purpose: a function that generates an auth token from the applications secrets

module.exports = createAuthToken

require('dotenv').config()

var sha1Hash = require('./helpers/sha1-hash.js')
var hmac256 = require('./helpers/hmac-256.js')

// Purpose: To generate an authorization token to authorize the user on each request to Golf Now API
// param(out): token: the authorization token to be used on every request
// calledBy: getCourseSummaries()

function createAuthToken () {
  var clientId = process.env.CLIENT_ID
  var clientSecret = process.env.CLIENT_SECRET
  var username = process.env.USERNAME
  var password = process.env.PASSWORD
  var encodedPassword = sha1Hash(password)
  var date = new Date()
  var year = date.getFullYear()
  var month = date.getMonth()
  var day = date.getDate()
  var hours = date.getHours()
  var minutes = date.getMinutes()
  var seconds = date.getSeconds()
  var timeStamp = Date.UTC(year, month, day, hours, minutes, seconds)
  var authHeader = username + encodedPassword + timeStamp
  authHeader = hmac256(authHeader, clientSecret)
  var headers = {
    Authorization: authHeader,
    Timestamp: timeStamp,
    AdvancedErrorCodes: 'True',
  }
  return headers
}
