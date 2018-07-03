module.exports = getPaymentInfo

const createPaymentInfoUrl = require('./create-payment-info-url.js')
const setPaymentInfo = require('./set-payment-info.js')
const got = require('got')

async function getPaymentInfo (sessionAttributes, accessToken) {
  let urlOptions = {
    headers: {
      AuthorizationToken: accessToken,
      UserName: process.env.USERNAME,
      Password: process.env.PASSWORD,
    }
  }

  let url = createPaymentInfoUrl(sessionAttributes)
  try {
    let res = await got(url, urlOptions)
    let wallet = JSON.parse(res.body)
    console.log(wallet)
    if (wallet.CreditCards[0] !== undefined) {
      let paymentInformation = setPaymentInfo(wallet.CreditCards[0])
      console.log(paymentInformation)
      return new Promise((resolve, reject) => {
        resolve(paymentInformation)
      })
    } else {
      let noBooking = 'We could not get your payment infomation at this time!'
      return new Promise((resolve, reject) => {
        reject(noBooking)
      })
    }
  } catch (error) {
    console.log(error)
    let noBooking = 'We could not get your payment infomation at this time!'
    return new Promise((resolve, reject) => {
      reject(noBooking)
    })
  }
}
