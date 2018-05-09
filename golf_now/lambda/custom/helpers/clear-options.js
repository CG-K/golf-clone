
module.exports = clearOptions

function clearOptions () {
  var options = require('../helpers/course-summary-options.json')
  var keys = Object.keys(options)
  for (var i = 0; i < keys.length; i++) {
    console.log(options[keys[i]])
    options[keys[i]] = null
    console.log(options[keys[i]])
  }
}
