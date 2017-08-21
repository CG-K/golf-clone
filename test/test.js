var chai = require('chai')
var bst = require('bespoken-tools')
var assert = chai.assert
var server = null
var alexa = null

beforeEach(function (done) {
  // first param - the location of lambda file to be return
  // second - port
  // third - verbose mode res/req sent to console
  server = new bst.LambdaServer('../index.js', 10000, true)
  // 1st - url of server
  // 2 - IntentSchema
  // utterances
  alexa = new bst.BSTAlexa('http://localhost:10000',
                './speechAssets/IntentSchema.json',
                './speechAssets/SampleUtterances.txt')
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
    assert.equal(payload.response.outputSpeech.ssml, '<speak> Welcome to Golf Now.  The purpose of this skill is to book a ' +
     'tee time at a Golf Course so you can start playing! To start using the skill, ' +
     'say Alexa, ask GolfNow to book a tee time near me. You can also search for tee ' +
     'times at a specific city or zip code. For city, you can say Alexa, ask GolfNow ' +
     'to book a tee time in Orlando. For a specific zipcode, you can say Alexa ' +
     'ask GolfNow to book a tee time near 32819. What would you like to do? </speak>')
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

it('Response for GetLocation is Correct for near me is correct', function (done) {
  alexa.intended('GetLocation', { 'nearme': 'near me' }, function (error, payload) {
    if (error) {
      console.log(error)
      done()
    }
    assert.equal(payload.response.outputSpeech.ssml, '<speak> We need to find you device location </speak>')
    assert.equal(payload.response.shouldEndSession, true)
    done()
  })
})

it('Response for GetLocation is Correct for zipcode is correct', function (done) {
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
