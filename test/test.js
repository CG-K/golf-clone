var chai = require('chai')
var bst = require('bespoken-tools')
var assert = chai.assert
var server = null
var alexa = null
var options = require('../helpers/course-summary-options.json')

beforeEach(function (done) {
  var path = require('path')
  var dotEnvPath = path.resolve('../.env')
  require('dotenv').config({path: dotEnvPath})
  // first param - the location of lambda file to be return
  // second - port
  // third - verbose mode res/req sent to console
  server = new bst.LambdaServer('../index.js', 10000, true)
  // 1st - url of server
  // 2 - IntentSchema
  // utterances
  alexa = new bst.BSTAlexa('http://localhost:10000',
                './speechAssets/IntentSchema.json',
                './speechAssets/SampleUtterances.txt', process.env.APP_ID)
  server.start(function () {
    alexa.start(function (error) {
      if (error !== undefined) {
        console.log('Error: ' + error)
      } else {
        done()
      }
    })
  })
})

afterEach(function (done) {
  alexa.stop(function () {
    server.stop(function () {
      done()
    })
  })
})

describe('Tests with No Inital State', function () {
  it('Launches the skill', function (done) {
    // Launch the skill via launch request
    alexa.launched(function (error, payload) {
      if (error) {
        console.log(error)
        done()
      }
      assert.equal(payload.response.outputSpeech.ssml, '<speak> Welcome to GolfNow.  You can book tee times at your favorite nearby courses.  You can say Alexa, ask GolfNow to book a tee time near me.  What would you like to do? </speak>')
      assert.equal(payload.response.shouldEndSession, false)
      done()
    })
  })

  it('Launches the Help intent and doesnt end session', function (done) {
    alexa.intended('AMAZON.HelpIntent', null, function (error, payload) {
      if (error) {
        console.log(error)
        done()
      }
      assert.equal(payload.response.outputSpeech.ssml, '<speak> Welcome to Golf Now.  The purpose of this skill is to book a tee time at a Golf Course so you can start playing! To start using the skill, say Alexa, ask GolfNow to book a tee time near me. You can also search for tee times at a specific city or zip code. For city, you can say Alexa, ask GolfNow to book a tee time in Orlando. For a specific zipcode, you can say Alexa ask GolfNow to book a tee time near 32819. What would you like to do? </speak>')
      assert.equal(payload.response.shouldEndSession, false)
      done()
    })
  })

  it('Stops and Exits Skill upon calling StopIntent', function (done) {
    alexa.intended('AMAZON.StopIntent', null, function (error, payload) {
      if (error) {
        console.log(error)
        done()
      }
      assert.equal(payload.response.outputSpeech.ssml, '<speak> Stopping your Request and Exiting Skill </speak>')
      assert.equal(payload.response.shouldEndSession, true)
      done()
    })
  })

  it('Cancels and Exits Skill upon calling CancelIntent', function (done) {
    alexa.intended('AMAZON.CancelIntent', null, function (error, payload) {
      if (error) {
        console.log(error)
        done()
      }
      assert.equal(payload.response.outputSpeech.ssml, '<speak> Canceling your Request and Exiting Skill </speak>')
      assert.equal(payload.response.shouldEndSession, true)
      done()
    })
  })

  it('Launches GetLocation with Utterance with ZipCode', function (done) {
    alexa.spoken('book me a tee time near {32819}', function (error, response, request) {
      if (error) {
        console.log(error)
      }
      assert.equal(request.request.intent.name, 'GetLocation')
    })
    done()
  })

  it('Launches GetLocation with Utterance with City', function (done) {
    alexa.spoken('book me a tee time in {Orlando}', function (error, response, request) {
      if (error) {
        console.log(error)
      }
      assert.equal(request.request.intent.name, 'GetLocation')
    })
    done()
  })

  it('Launches GetLocation with Utterance with Near Me', function (done) {
    alexa.spoken('book me a tee time {near me}', function (error, response, request) {
      if (error) {
        console.log(error)
      }
      assert.equal(request.request.intent.name, 'GetLocation')
    })
    done()
  })

  it('Response for GetLocation is Correct with zipcode', function (done) {
    alexa.intended('GetLocation', { 'zipcode': '32819' }, function (error, payload) {
      if (error) {
        console.log(error)
        done()
      }
      assert.equal(payload.response.outputSpeech.ssml, '<speak> What day would you like to play? </speak>')
      assert.equal(payload.response.shouldEndSession, false)
      done()
    })
  })

  it('Response for GetLocation is Correct for city is correct', function (done) {
    alexa.intended('GetLocation', { 'city': 'Orlando' }, function (error, payload) {
      if (error) {
        console.log(error)
        done()
      }
      assert.equal(payload.response.outputSpeech.ssml, '<speak> What day would you like to play? </speak>')
      assert.equal(payload.response.shouldEndSession, false)
      done()
    })
  })
})

it('Launches DatesReceived with Utterance of tomorrow', function (done) {
  alexa._alexa._context._session.updateAttributes({'STATE': 'location'})
  alexa.spoken('try {tomorrow}', function (error, response, request) {
    if (error) {
      console.log(error)
      done()
    }
    assert.equal(request.request.intent.name, 'DatesReceived')
  })
  done()
})

it('Launches DatesReceived with Utterance of Date', function (done) {
  alexa._alexa._context._session.updateAttributes({'STATE': 'location'})
  alexa.spoken('{September 3}', function (error, response, request) {
    if (error) {
      console.log(error)
    }
    assert.equal(request.request.intent.name, 'DatesReceived')
  })
  done()
})

it('Response for DatesReceived is correct', function (done) {
  alexa._alexa._context._session.updateAttributes({'STATE': 'location'})
  alexa.intended('DatesReceived', { 'dateToPlay': '2017-09-04' }, function (error, payload) {
    if (error) {
      console.log(error)
      done()
    }
    assert.equal(payload.response.outputSpeech.ssml, '<speak> What time would you like to play? </speak>')
    assert.equal(payload.response.shouldEndSession, false)
    done()
  })
})

it('Launches TimeReceived with Utterance of 4 pm', function (done) {
  alexa._alexa._context._session.updateAttributes({'STATE': 'dates'})
  alexa.spoken('maybe at {4 pm}', function (error, response, request) {
    if (error) {
      console.log(error)
    }
    assert.equal(request.request.intent.name, 'TimeReceived')
  })
  done()
})

it('Response for TimeReceived is correct', function (done) {
  alexa._alexa._context._session.updateAttributes({'STATE': 'dates'})
  alexa.intended('TimeReceived', { 'timeToPlay': '4:00' }, function (error, payload) {
    if (error) {
      console.log(error)
      done()
    }
    assert.equal(payload.response.outputSpeech.ssml, '<speak> How many players would you like to golf with? </speak>')
    assert.equal(payload.response.shouldEndSession, false)
    done()
  })
})

it('Launches NumGolfersReceived with Utterance of 4 pm', function (done) {
  alexa._alexa._context._session.updateAttributes({'STATE': 'time'})
  alexa.spoken('{4} players', function (error, response, request) {
    if (error) {
      console.log(error)
    }
    assert.equal(request.request.intent.name, 'NumGolfersReceived')
  })
  done()
})

it('Response for NumGolfersReceived is correct', function (done) {
  alexa._alexa._context._session.updateAttributes({'STATE': 'time'})
  alexa.intended('NumGolfersReceived', { 'numberOfGolfers': '2' }, function (error, payload) {
    if (error) {
      console.log(error)
      done()
    }
    assert.equal(payload.response.outputSpeech.ssml, '<speak> What is the most you would like to spend per player? </speak>')
    assert.equal(payload.response.shouldEndSession, false)
    done()
  })
})

it('Launches PriceReceived with Utterance of 40 dollars', function (done) {
  alexa._alexa._context._session.updateAttributes({'STATE': 'numGolfers'})
  alexa.spoken('{40} dollars', function (error, response, request) {
    if (error) {
      console.log(error)
      done()
    }
    assert.equal(request.request.intent.name, 'PriceReceived')
  })
  done()
})

it('Response for PriceReceived is correct', function (done) {
  options.latitude = 40.896350
  options.longitude = -73.941539
  options.date = '2017-09-04'
  options.time = '4:00'
  options.numGolfers = '2'
  alexa._alexa._context._session.updateAttributes({'STATE': 'numGolfers'})
  alexa.intended('PriceReceived', { 'amountOfDollars': '50' }, function (error, payload) {
    if (error) {
      console.log(error)
      done()
    }
    // assert.include(payload.response.outputSpeech.ssml, '<speak> Here are your course options: </speak>')
    assert.equal(payload.response.shouldEndSession, false)
    done()
  })
})
