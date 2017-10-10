// dates-received-intent.js
// Purpose: a function that handles the dates recevied intent
module.exports = getNewState

var states = require('./states.json')
var responses = require('./responses.json')

// Purpose: saves the date of Golfers given by the user and prompts for more information
function getNewState() {
  var options = require('./course-summary-options.json')
  var res = {
    state: '',
    response: '',
    reprompt: ''
  }
  console.log(options)
  if (options.dealType === null || options.latitude === null || options.longitude === null) {
    res.state = ''
    res.response = responses.location.output
    res.reprompt = responses.location.reprompt
    return res
  } else if (options.date === null) {
    res.state = states.LOCATIONMODE
    res.response = responses.dates.output
    res.reprompt = responses.dates.reprompt
    return res
  } else if (options.time === null) {
    res.state = states.DATESMODE
    res.response = responses.time.output
    res.reprompt = responses.time.reprompt
    return res
  } else if (options.numGolfers === null) {
    res.state = states.TIMEMODE
    res.response = responses.numGolfers.output
    res.reprompt = responses.numGolfers.reprompt
    return res
  } else if (options.price === null) {
    res.state = states.NUMGOLFERSMODE
    res.response = responses.price.output
    res.reprompt = responses.price.reprompt
    return res
  } else if (options.courses === null) {
    res.state = states.PRICEMODE
    return res
  } else {
    res.state = states.HEARCOURSESMODE
    return res
  }
}
