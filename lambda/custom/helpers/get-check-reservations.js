module.exports = getCheckReservations

const createCheckReservationsUrl = require('./create-check-reservations-url.js')
const formatReservationsResponse = require('./format-reservations-response.js')
const getFacilityById = require('./get-facility-by-id.js')
const got = require('got')

async function getCheckReservations (accessToken, email) {
  let urlOptions = {
    headers: {
      AuthorizationToken: accessToken,
      UserName: process.env.USERNAME,
      Password: process.env.PASSWORD,
    }
  }

  let url = createCheckReservationsUrl(email)
  try {
    let res = await got(url, urlOptions)
    let parsedReservations = JSON.parse(res.body)
    console.log(parsedReservations)
    try {
      let courseName = await getFacilityById(parsedReservations.Reservations[0].Invoice.FacilityID, accessToken)
      let response = formatReservationsResponse(parsedReservations, courseName)
      return new Promise((resolve, reject) => {
        resolve(response)
      })
    } catch (err) {
      console.log(err)
      let noCourse = 'We could not get the course name for your reservation'
      return new Promise((resolve, reject) => {
        reject(noCourse)
      })
    }
  } catch (error) {
    console.log(error)
    let noReservations = 'We could not get Reservations at this time!'
    return new Promise((resolve, reject) => {
      reject(noReservations)
    })
  }
}
