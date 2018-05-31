module.exports = initializeSessionAttributes

function initializeSessionAttributes(sessionAttributes) {
  sessionAttributes['dealType'] = null
  sessionAttributes['latitude'] = null
  sessionAttributes['longitude'] = null
  sessionAttributes['date'] = null
  sessionAttributes['time'] = null
  sessionAttributes['numGolfers'] = null
  sessionAttributes['price'] = null
  sessionAttributes['courseID'] = null
  sessionAttributes['teeTimes'] = null
  sessionAttributes['teeTimeRateID'] = null
  sessionAttributes['CoursesResponse'] = null
  sessionAttributes['maxCoursesLength'] = null
  sessionAttributes['courses'] = null
  sessionAttributes['coursesCount'] = 0
  sessionAttributes['teeTimesCount'] = 0
  return sessionAttributes
}
