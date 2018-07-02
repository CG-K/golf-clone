module.exports = createPaymentInfoUrl

function createPaymentInfoUrl (sessionAttributes) {
  let baseURL = 'https://rc2-api.gnsvc.com/rest/customers/'
  if (sessionAttributes['email'] !== null && sessionAttributes['email'] !== undefined) {
    baseURL = baseURL + sessionAttributes['email']
  }
  baseURL = baseURL + '/wallet?channelid=7886'
  return baseURL
}
