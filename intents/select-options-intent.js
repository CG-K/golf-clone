// select-options-intent.js
// Purpose: to launch when the user selects a course or tee time
module.exports = SelectOptionsIntent

var states = require('../helpers/states.json')
var getNewState = require('../helpers/get-new-state.js')
var createTeeTimesURL = require('../helpers/create-tee-times-url.js')
var getTeeTimes = require('../helpers/get-tee-times.js')

// Purpose: to launch when the user selects a course or tee time
function SelectOptionsIntent () {
  var options = require('../helpers/course-summary-options.json')
  var emit = this.emit
  var handler = this.handler
  var output = ''
  var nextState = getNewState()
  this.handler.state = nextState.state
  console.log(options)
  console.log('We are in select options with the state: ' + this.handler.state)
  if (this.handler.state === states.HEARCOURSESMODE) {
    if (this.event.request.intent.slots.optionNumber.value === undefined) {
      nextState = getNewState()
      console.log(this.event.request.intent.name)
      console.log('courseNumber is undefined.  the next state is: ' + nextState.state)
      this.handler.state = nextState.state
      this.emit(':ask', nextState.response, nextState.reprompt)
    } else {
      options.courseID = this.event.request.intent.slots.optionNumber.value - 1
      nextState = getNewState()
      this.handler.state = nextState.state
      output = 'You have selected: ' + options.courses[options.courseID]
      options.facilityID = options.CoursesResponse.Items[options.courseID].ID
      getTeeTimes(options, function (err, res) {
        if (err) {
          console.log(err)
          emit(':tell', err)
        }
        console.log(res)
        nextState = getNewState()
        handler.state = nextState.state
        emit(':ask', res)
      })
    }
  } else if (this.handler.state === states.HEARTEETIMESMODE) {
      if (this.event.request.intent.slots.optionNumber.value === undefined) {
        nextState = getNextState()
        console.log(this.event.request.intent.name)
        console.log('teeTime is undefined.  the next state is: ' + nextState.state)
        this.handler.state = nextState.state
        this.emit(':ask', nextState.response, nextState.reprompt)
      } else {
        options.teeTimeID = this.event.request.intent.slots.optionNumber.value - 1
        nextState = getNewState()
        this.handler.state = nextState.state
        output = 'You have selected: ' + options.teeTimes[options.teeTimeID]
        options.teeTimeRateID = options.TeeTimesResponse.TeeTimes[options.teeTimeID].DisplayRate.TeeTimeRateID
        console.log(options.teeTimeRateID)
        this.emit(':ask', output, output)
      }
    }
}
