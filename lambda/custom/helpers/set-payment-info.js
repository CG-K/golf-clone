module.exports = setPaymentInfo

const parseAddress = require('./parse-address.js')

function setPaymentInfo(wallet) {
  let address = parseAddress(wallet.Address)
  let value = 0
  for (let i = 0; i < sessionAttributes['teeTimeInvoice'].DueOnline.Items.length; i++) {
    value = value + sessionAttributes['teeTimeInvoice'].DueOnline.Items[i].Total
  }
  console.log(value)
  let paymentInfomation = {
      "__type" :  "CreditCardPayment:#GolfNow.API.Contracts.DataContracts",
      "Amount" : {
        "CurrencyCode" :  "USD",
        "Value" :  value
      },
      "BillingAddress" : {
        "City" :  address.city,
        "Country" :  wallet.CountryCode,
        "Line1" :  address.street,
        "Line2" :  null,
        "PostalCode" : wallet.PostalCode,
        "StateProvinceCode" :  address.state
      },
      "BillingName" :  wallet.Name,
      "BillingPhoneNumber" :  "555-555-5555",
      "CVVCode" :  123,
      "CreditCardNumber" :  wallet.Number,
      "ExpirationMonth" :  wallet.ExpirationMonth,
      "ExpirationYear" :  wallet.ExpirationYear,
      "SaveCreditCard" :  false
  }
}
