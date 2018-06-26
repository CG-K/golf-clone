module.exports = getTeeTimeInvoice

const got = require('got')
const createTeeTimeInvoiceUrl = require('../helpers/create-tee-time-invoice-url.js')
const formatTeeTimeInvoiceResponse = require('../helpers/format-tee-time-invoice-response.js')

async function getTeeTimeInvoice (accessToken, email, sessionAttributes) {
  let urlOptions = {
    headers: {
      AuthorizationToken: accessToken,
      UserName: process.env.USERNAME,
      Password: process.env.PASSWORD
    }
  }
  console.log(urlOptions)
  let url = createTeeTimeInvoiceUrl(email, sessionAttributes)
  console.log('we have received a url')
  try {
    let teeTimeInvoiceResponse = await got(url, urlOptions)
    let teeTimeInvoice = JSON.parse(teeTimeInvoiceResponse.body)
    console.log(teeTimeInvoice)
    let invoiceResponse = formatTeeTimeInvoiceResponse(teeTimeInvoice, sessionAttributes)
    return new Promise((resolve, reject) => {
      resolve(invoiceResponse)
    })
  } catch (error) {
    console.log(error)
    const noTeeTimeInvoice = 'Failed to get Tee Time Invoice for customer'
    return new Promise((resolve, reject) => {
      reject(noTeeTimeInvoice)
    })
  }
}
