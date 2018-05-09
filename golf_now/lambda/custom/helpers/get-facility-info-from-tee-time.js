module.exports = getFacilityInfoFromTeeTime

// Purpose: To get the proper facility information from the GetTeeTimesByGeoLocation Request
// param(in): facilityId: the Id for the specific facility we are giving a tee time for
// param(in): facilitiesData: facilities response data from GetTeeTimesByGeoLocation
// param(out): nameAndCity: returns the city and name of the Facility for the user
// param(out): noCityName: returns a statement when no facility was found
// calledBy: formatCourseSummaries()
function getFacilityInfoFromTeeTime (facilityId, facilitiesData) {
  var nameAndCity = {
    name: '',
    city: ''
  }
  for (var facility = 0; facility < facilitiesData.Value.length; facility++) {
    if (facilitiesData.Value[facility].ID === facilityId) {
      nameAndCity.name = facilitiesData.Value[facility].Name
      nameAndCity.city = facilitiesData.Value[facility].Address.City
      return nameAndCity
    }
  }
}
