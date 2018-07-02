module.exports = bookTeeTime

const createAddReservationUrl = require('./create-add-reservation-url.js')
const createAddReservationBody = require('./create-add-reservation-body.js')
const got = require('got')

// async function bookTeeTime (sessionAttributes, accessToken, paymentInformation) {
async function bookTeeTime (sessionAttributes, accessToken) {
  let urlOptions = {
    headers: {
      AuthorizationToken: accessToken,
      UserName: process.env.USERNAME,
      Password: process.env.PASSWORD,
      "Content-Type": 'application/json'
    },
    body: {}
  }
  let url = createAddReservationUrl(sessionAttributes)
  // urlOptions.body = createAddReservationBody(sessionAttributes, paymentInfomation)
  urlOptions.body = createAddReservationBody(sessionAttributes)
  // try this in postman to see if it works as form-data
  console.log(urlOptions)
  urlOptions.body = JSON.stringify(urlOptions.body)
  console.log(typeof(urlOptions.body))
  console.log(urlOptions)
  console.log(url)
  try {
    let res = await got(url, urlOptions)
    let parsedBooking = JSON.parse(res.body)
    console.log(parsedBooking)
    return new Promise((resolve, reject) => {
      resolve(parsedBooking)
    })
  } catch (error) {
    console.log(error)
    let noBooking = 'We could not book a tee time at this time!'
    return new Promise((resolve, reject) => {
      reject(noBooking)
    })
  }
}
