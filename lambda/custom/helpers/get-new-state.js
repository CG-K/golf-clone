// dates-received-intent.js
// Purpose: a function that handles the dates recevied intent
module.exports = getNewState

var states = require('./states.json')
var responses = require('./responses.json')

// Purpose: saves the date of Golfers given by the user and prompts for more information
function getNewState (sessionAttributes) {
  var res = {
    state: '',
    response: '',
    reprompt: ''
  }
  // when given multiple forms of information we are not setting the state properly
  console.log(sessionAttributes)
  if (sessionAttributes['dealType'] === null || sessionAttributes['latitude'] === null || sessionAttributes['longitude'] === null) {
    res.state = ''
    res.response = responses.location.output
    res.reprompt = responses.location.reprompt
    return res
  } else if (sessionAttributes['date'] === null) {
    res.state = states.LOCATIONMODE
    res.response = responses.dates.output
    res.reprompt = responses.dates.reprompt
    return res
  } else if (sessionAttributes['time'] === null) {
    res.state = states.DATESMODE
    res.response = responses.time.output
    res.reprompt = responses.time.reprompt
    return res
  } else if (sessionAttributes['numGolfers'] === null) {
    res.state = states.TIMEMODE
    res.response = responses.numGolfers.output
    res.reprompt = responses.numGolfers.reprompt
    return res
  } else if (sessionAttributes['price'] === null) {
    res.state = states.NUMGOLFERSMODE
    res.response = responses.price.output
    res.reprompt = responses.price.reprompt
    return res
  } else if (sessionAttributes['courses'] === null) {
    res.state = states.PRICEMODE
    return res
  } else if (sessionAttributes['courseID'] === null) {
    res.state = states.HEARCOURSESMODE
    return res
  } else if (sessionAttributes['teeTimes'] === null) {
    res.state = states.SELECTCOURSEMODE
    return res
  } else if (sessionAttributes['teeTimeRateID'] === null) {
    res.state = states.HEARTEETIMESMODE
    return res
  } else {
    res.state = states.SELECTTEETIMEMODE
    return res
  }
}
