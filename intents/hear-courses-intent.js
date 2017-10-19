// hear-courses-intent.js
// Purpose: a function that handles the dates recevied intent
module.exports = HearCoursesIntent

var states = require('../helpers/states.json')
var getNewState = require('../helpers/get-new-state.js')

// Purpose: to say a course option for a tee time to the user
function HearCoursesIntent () {
  this.handler.state = states.HEARCOURSESMODE
  var ending
  var output
  var reprompt
  var options = require('../helpers/course-summary-options.json')
  options.coursesCount = options.coursesCount + 1
  if (options.coursesCount === (options.maxCoursesLength)) {
    ending = 'Those are all your options, which option would you like to book?'
    output = options.courses[options.coursesCount] + ending
  } else {
    ending = 'Do you want to book a tee time here or would you like to here the next one?'
    reprompt = options.courses[options.coursesCount] + ending
  }
  this.emit(':ask', output, reprompt)
}
