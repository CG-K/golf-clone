
module.exports = clearOptions

function clearOptions (handlerInput) {
    let sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
    if (sessionAttributes['courseOptions']) {
      var keys = Object.keys(sessionAttributes['courseOptions'])
      for (var i = 0; i < keys.length; i++) {
        console.log(options[key[i]])
        options[keys[i]] = null
        console.log(options[keys[i]])
      }
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
      return
    }
    return
}
