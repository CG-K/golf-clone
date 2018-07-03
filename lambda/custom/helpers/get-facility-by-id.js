module.exports = getFacilityById

const createFacilityByIdUrl = require('./create-facility-by-id-url.js')
const got = require('got')

async function getFacilityById(facilityID, accessToken) {
  let urlOptions = {
    headers: {
      AuthorizationToken: accessToken,
      UserName: process.env.USERNAME,
      Password: process.env.PASSWORD,
    }
  }
  let url = createFacilityByIdUrl(facilityID)
  try {
    let res = await got(url, urlOptions)
    let parsedRes = JSON.parse(res.body)
    console.log(parsedRes)
    return new Promise((resolve, reject) => {
      resolve(parsedRes.Name)
    })
  } catch (error) {
    console.log(error)
    let noReservations = 'We could not get Reservations at this time!'
    return new Promise((resolve, reject) => {
      reject(noReservations)
    })
  }
}
