// select-course-intent.js
// Purpose: to launch when the user selects a course
module.exports = SelectCourseIntent

var states = require('../helpers/states.json')
var getNewState = require('../helpers/get-new-state.js')

// Purpose: to launch when the user selects a course
function SelectCourseIntent () {
  if (this.event.request.intent.slots.courseNumber.value === undefined) {
    var nextState = getNextState()
    console.log(this.event.request.intent.name)
    console.log('courseNumber is undefined.  the next state is: ' + nextState.state)
    this.handler.state = nextState.state
    this.emit(':ask', nextState.response, nextState.reprompt)
  } else {
    this.handler.state = states.SELECTCOURSEMODE
    var options = require('../helpers/course-summary-options.json')
    options.courseID = this.event.request.intent.slots.courseNumber.value - 1
    var output = 'You have selected: ' + options.courses[options.courseID]
    this.emit(':ask', output, output)
  }
}
