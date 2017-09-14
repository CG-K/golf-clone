
module.exports = getCurrentDate

// Purpose: To create a current date for the URL that needs it
// param(out): currentDate: today's  date
// calledBy: createCourseSummariesURL()
function getCurrentDate() {
  var today = new Date()
  console.log('Today is: ' + today)
  var dd = today.getDate()
  var mm = today.getMonth() + 1
  var yyyy = today.getFullYear()

  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  var currentDate = yyyy + '-' + mm + '-' + dd
  console.log('Current Date is: ' + currentDate)
  return currentDate
}
