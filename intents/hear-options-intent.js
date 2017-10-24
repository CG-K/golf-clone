// hear-options-intent.js
// Purpose: a function that presents the user with course options or tee times
module.exports = HearOptionsIntent

var states = require('../helpers/states.json')
var getNewState = require('../helpers/get-new-state.js')

// Purpose: a function that presents the user with course options or tee times
function HearOptionsIntent () {
  var ending
  var output
  var options = require('../helpers/course-summary-options.json')
  if (this.handler.state === states.HEARCOURSESMODE) {
    options.coursesCount = options.coursesCount + 1
    console.log('We are adding one to courseCount ' + options.coursesCount)
    console.log(this.event)
    if (options.coursesCount === (options.maxCoursesLength - 1)) {
      ending = 'Those are all your options, which option would you like to book?'
      output = options.courses[options.coursesCount] + ending
      this.emit(':ask', output, output)
    } else {
      ending = 'Do you want to book a tee time here or would you like to here the next one?'
      output = options.courses[options.coursesCount] + ending
      this.emit(':ask', output, output)
    }
  } else if (this.handler.state === states.HEARTEETIMESMODE) {
    options.teeTimesCount = options.teeTimesCount + 1
    console.log('We are adding one to teeTimesCount ' + options.teeTimesCount)
    console.log(this.event)
    if (options.teeTimesCount === (options.maxTeeTimeLength - 1)) {
      ending = 'Those are all your options, which option would you like to book?'
      output = options.teeTimes[options.teeTimesCount] + ending
      this.emit(':ask', output, output)
    } else {
      ending = 'Do you want to book a tee time here or would you like to here the next one?'
      output = options.teeTimes[options.teeTimesCount] + ending
      this.emit(':ask', output, output)
    }
  }
}
