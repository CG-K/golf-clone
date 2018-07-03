module.exports = createFacilityByIdUrl

function createFacilityByIdUrl(facilityID) {
  let baseURL = `https://rc2-api.gnsvc.com/rest/channel/7886/facilities/`
  if (facilityID !== null || facilityID !== undefined) {
    baseURL = baseURL + facilityID
  }
  console.log(baseURL)
  return baseURL
}
