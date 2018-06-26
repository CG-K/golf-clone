module.exports = createTeeTimeInvoiceUrl

function createTeeTimeInvoiceUrl (email, sessionAttributes) {
  let baseURL = `https://rc2-api.gnsvc.com/rest/channel/7886/facilities/${sessionAttributes['facilityID']}/tee-times/${sessionAttributes['teeTimeRateID']}/invoice/customer-invoice?`
  console.log(baseURL)
  if (email !== null || email !== undefined) {
    baseURL = baseURL + `customeremail=${email}`
  }
  console.log(baseURL)

  if (sessionAttributes['numGolfers'] !== null && sessionAttributes['numGolfers'] !== undefined && sessionAttributes['numGolfers'] !== 'any') {
    baseURL = baseURL + `&player-count=${sessionAttributes['numGolfers']}`
  }
  console.log(baseURL)
  return baseURL
}
