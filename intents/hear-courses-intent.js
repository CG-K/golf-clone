// hear-courses-intent.js
// Purpose: a function that handles the dates recevied intent
module.exports = HearCoursesIntent

var states = require('../helpers/states.json')
var getNewState = require('../helpers/get-new-state.js')

// Purpose: to say a course option for a tee time to the user
function HearCoursesIntent () {
  this.handler.state = states.HEARCOURSESMODE
  var options = require('../helpers/course-summary-options.json')
  options.coursesCount = options.coursesCount + 1
  this.emit(':ask', options.courses[options.coursesCount], options.courses[options.coursesCount])
}
