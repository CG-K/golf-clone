module.exports = createAddReservationUrl

function createAddReservationUrl (sessionAttributes) {
  let baseURL = `https://rc2-api.gnsvc.com/rest/customers/`
  console.log(baseURL)
  if (sessionAttributes['email'] !== null || sessionAttributes['email'] !== undefined) {
    baseURL = baseURL + `${sessionAttributes['email']}/reservations?`
  }
  console.log(baseURL)
  return baseURL
}
