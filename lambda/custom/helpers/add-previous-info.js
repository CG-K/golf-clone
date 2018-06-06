module.exports = addPreviousInfo

const NO_INFO = 0

function addPreviousInfo (sessionAttributes) {
  let response = 'Ok,'
  if (sessionAttributes['previousInfo'].length > NO_INFO) {
    for (var i = 0; i < sessionAttributes['previousInfo'].length; i++) {
      response = response + ' ' + sessionAttributes['previousInfo'][i]
    }
    response = response + '. '
  }
  return response
}
