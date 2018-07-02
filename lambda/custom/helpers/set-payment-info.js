module.exports = setPaymentInfo

const parseAddress = require('./parse-address.js')

function setPaymentInfo(wallet) {
  let address = parseAddress(wallet.Address)
  let paymentInfomation = {
      "__type" :  "CreditCardPayment:#GolfNow.API.Contracts.DataContracts",
      "Amount" : {
        "CurrencyCode" :  "USD",
        "Value" :  4.98
      },
      "BillingAddress" : {
        "City" :  address.city,
        "Country" :  wallet.CountryCode,
        "Line1" :  address.street,
        "Line2" :  null,
        "PostalCode" : wallet.PostalCode,
        "StateProvinceCode" :  "FL"
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
