// create-auth-token.js
// Purpose: a function that generates an auth token from the applications secrets

module.exports = createAuthToken

require('dotenv').config()

// Purpose: To generate an authorization token to authorize the user on each request to Golf Now API
// param(out): token: the authorization token to be used on every request
// calledBy: getCourseSummaries()

function createAuthToken () {
  var Buffer = require('safe-buffer').Buffer
  var clientId = process.env.CLIENT_ID
  var clientSecret = process.env.CLIENT_SECRET
  console.log(clientId)
  console.log(clientSecret)
  var token = Buffer.from(clientId + ':' + clientSecret).toString('base64')
  console.log(token)
  return token
}
