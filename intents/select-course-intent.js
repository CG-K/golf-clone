// select-course-intent.js
// Purpose: to launch when the user selects a course
module.exports = SelectCourseIntent

var states = require('../helpers/states.json')
var getNewState = require('../helpers/get-new-state.js')

// Purpose: to launch when the user selects a course
function SelectCourseIntent () {
  this.handler.state = states.SELECTCOURSEMODE
  var options = require('../helpers/course-summary-options.json')
  options.courseID = this.event.request.intent.slots.courseNumber.value - 1
  var output = 'You have selected: ' + options.courses[options.courseID]
  this.emit(':ask', output, output)
}
