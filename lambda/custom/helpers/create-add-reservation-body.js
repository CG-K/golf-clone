module.exports = createAddReservationBody

// function createAddReservationBody (sessionAttributes, paymentInformation) {
function createAddReservationBody (sessionAttributes) {
  let reservation = {
  //   "PaymentInformation": [paymentInfomation],
      "PaymentInformation" : [
        {
          "__type" :  "CreditCardPayment:#GolfNow.API.Contracts.DataContracts",
          "Amount" : {
            "CurrencyCode" :  "USD",
            "Value" :  4.98
          },
          "BillingAddress" : {
            "City" :  "Orlando",
            "Country" :  "US",
            "Line1" :  "123 Any St.",
            "Line2" :  null,
            "PostalCode" :  32819,
            "StateProvinceCode" :  "FL"
          },
          "BillingName" :  "GolfNowTest GolfNowTest",
          "BillingPhoneNumber" :  "555-555-5555",
          "CVVCode" :  321,
          "CreditCardNumber" :  4012888888881881,
          "ExpirationMonth" :  06,
          "ExpirationYear" :  2019,
          "SaveCreditCard" :  false
        }
      ],
      "InventoryChannelID": 7886,
      "TeeTimeRateID": sessionAttributes['teeTimeRateID'],
      "Invoice": {
        "TeeTimeRateID": sessionAttributes['teeTimeRateID'],
        "RateName": sessionAttributes['teeTimeInvoice'].RateName,
        "PromoCodeApplied": sessionAttributes['teeTimeInvoice'].PromoCodeApplied,
        "PromoCodeResults": sessionAttributes['teeTimeInvoice'].PromoCodeResults,
        "PlayerCount": sessionAttributes['teeTimeInvoice'].PlayerCount,
        "IsPayNow": sessionAttributes['teeTimeInvoice'].IsPayNow,
        "TotalReservationPrice": sessionAttributes['teeTimeInvoice'].TotalReservationPrice,
        "Pricing": sessionAttributes['teeTimeInvoice'].Pricing,
        "TransactionFeeWaived": sessionAttributes['teeTimeInvoice'].TransactionFeeWaived,
        "PreDiscountPricing": sessionAttributes['teeTimeInvoice'].PreDiscountPricing,
        "DiscountsApplied": sessionAttributes['teeTimeInvoice'].DiscountsApplied,
        "TeeTimeNotes": sessionAttributes['teeTimeInvoice'].TeeTimeNotes,
        "TermsAndConditions": sessionAttributes['teeTimeInvoice'].TermsAndConditions,
        "PolicyItems": sessionAttributes['teeTimeInvoice'].PolicyItems,
        "WorryFreeEligibilityStatus": sessionAttributes['teeTimeInvoice'].WorryFreeEligibilityStatus,
        "PromoCodeSuccessMessage": sessionAttributes['teeTimeInvoice'].PromoCodeSuccessMessage,
        "PlayerRule": sessionAttributes['teeTimeInvoice'].PlayerRule,
        "HoleCount": sessionAttributes['teeTimeInvoice'].HoleCount,
        "Transportation": sessionAttributes['teeTimeInvoice'].Transportation,
        "RateTagCodes": sessionAttributes['teeTimeInvoice'].RateTagCodes,
        "IsHotDeal": sessionAttributes['teeTimeInvoice'].IsHotDeal,
        "RestrictedRateMessage": sessionAttributes['teeTimeInvoice'].RestrictedRateMessage,
        "TeeTimeOffer": sessionAttributes['teeTimeInvoice'].TeeTimeOffer,
        "PricingByNumberOfPlayers": sessionAttributes['teeTimeInvoice'],
        "ProductTypeIds": sessionAttributes['teeTimeInvoice'].ProductTypeIds,
        "CurrencyCode": sessionAttributes['teeTimeInvoice'].CurrencyCode,
        "DueOnline": sessionAttributes['teeTimeInvoice'].DueOnline,
        "DueAtCourse": sessionAttributes['teeTimeInvoice'].DueAtCourse,
        "TotalDue": sessionAttributes['teeTimeInvoice'].TotalDue,
        "IsReservationRestricted": sessionAttributes['teeTimeInvoice'].IsReservationRestricted,
        "HasMembershipDiscount": sessionAttributes['teeTimeInvoice'].HasMembershipDiscount,
        "FacilityFlags": sessionAttributes['teeTimeInvoice'].FacilityFlags,
        "IsScheduledPaymentEnabled": sessionAttributes['teeTimeInvoice'].IsScheduledPaymentEnabled,
        "ProductAccessList": sessionAttributes['teeTimeInvoice'].ProductAccessList,
        "RateSetTypeId": sessionAttributes['teeTimeInvoice'].RateSetTypeId,
        "GroupSizeLimit": sessionAttributes['teeTimeInvoice'].GroupSizeLimit,
        "FacilityID": sessionAttributes['teeTimeInvoice'].FacilityID,
        "Time": sessionAttributes['teeTimeInvoice'].Time
      }
  }
  return reservation
}
