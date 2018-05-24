// hear-options-intent.js
// Purpose: a function that presents the user with course options or tee times
module.exports = HearOptionsIntent

var states = require('../helpers/states.json')

// // Purpose: a function that presents the user with course options or tee times
// function HearOptionsIntent () {
//   var ending
//   var output
//   var options = require('../helpers/course-summary-options.json')
//   if (this.handler.state === states.HEARCOURSESMODE) {
//     options.coursesCount = options.coursesCount + 1
//     if (options.coursesCount === (options.maxCoursesLength - 1)) {
//       ending = 'Those are all your options, which option would you like to book?'
//       output = options.courses[options.coursesCount] + ending
//       this.emit(':ask', output, output)
//     } else {
//       ending = 'Do you want to book a tee time here or would you like to here the next one?'
//       output = options.courses[options.coursesCount] + ending
//       this.emit(':ask', output, output)
//     }
//   } else if (this.handler.state === states.HEARTEETIMESMODE) {
//     options.teeTimesCount = options.teeTimesCount + 1
//     if (options.teeTimesCount === (options.maxTeeTimeLength - 1)) {
//       ending = 'Those are all your options, which option would you like to book?'
//       output = options.teeTimes[options.teeTimesCount] + ending
//       this.emit(':ask', output, output)
//     } else {
//       ending = 'Do you want to book a tee time here or would you like to here the next one?'
//       output = options.teeTimes[options.teeTimesCount] + ending
//       this.emit(':ask', output, output)
//     }
//   }
// }

// Purpose: a function that presents the user with course options or tee times
function HearOptionsIntent (handlerInput) {
  var ending
  var output
  let sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
  if (sessionAttributes['STATE'] === states.HEARCOURSESMODE) {
    sessionAttributes['coursesCount'] = sessionAttributes['coursesCount'] + 1
    if (sessionAttributes['coursesCount'] === (sessionAttributes['maxCoursesLength'] - 1)) {
      ending = 'Those are all your options, which option would you like to book?'
      output = sessionAttributes['courses'][sessionAttributes['coursesCount']] + ending
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
      return handlerInput.responseBuilder
        .speak(output)
        .reprompt(output)
        .withSimpleCard('Select an Option', output)
        .getResponse()
    } else {
      ending = 'Do you want to book a tee time here or would you like to here the next one?'
      output = sessionAttributes['courses'][sessionAttributes['coursesCount']] + ending
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
      return handlerInput.responseBuilder
        .speak(output)
        .reprompt(output)
        .withSimpleCard('Select an Option', output)
        .getResponse()
    }
  } else if (sessionAttributes['STATE'] === states.HEARTEETIMESMODE) {
    sessionAttributes['teeTimesCount'] = sessionAttributes['teeTimesCount'] + 1
    if (sessionAttributes['teeTimesCount'] === (sessionAttributes['maxTeeTimeLength'] - 1)) {
      ending = 'Those are all your options, which option would you like to book?'
      output = sessionAttributes['teeTimes'][sessionAttributes['teeTimesCount']] + ending
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
      return handlerInput.responseBuilder
        .speak(output)
        .reprompt(output)
        .withSimpleCard('Select an Option', output)
        .getResponse()
    } else {
      ending = 'Do you want to book a tee time here or would you like to here the next one?'
      output = sessionAttributes['teeTimes'][sessionAttributes['teeTimesCount']] + ending
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
      return handlerInput.responseBuilder
        .speak(output)
        .reprompt(output)
        .withSimpleCard('Select an Option', output)
        .getResponse()
    }
  }
}
