
module.exports = createCheckReservationsUrl

// Purpose: To create a URL for check reservations endpoint

const TAKE = 5

function createCheckReservationsUrl (email) {
  var baseURL = 'https://rc2-api.gnsvc.com/rest/customers/'
  if (email !== null && email !== undefined) {
    baseURL = baseURL + email
  }

  baseURL = baseURL + `/reservations?take=${TAKE}`
  console.log(baseURL)
  return baseURL
}
