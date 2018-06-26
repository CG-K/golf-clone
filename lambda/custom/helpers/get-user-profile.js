module.exports = getUserProfile

const got = require('got')

async function getUserProfile(accessToken) {
  let urlOptions = {
    headers: {
      Authorization: accessToken
    }
  }
  let url = 'https://stage-api.golfid.io/api/v1/sso/oauth/profile'
  try {
    let response = await got(url, urlOptions)
    let userInfo = JSON.parse(response.body)
    console.log(userInfo)
    return new Promise((resolve, reject) => {
      resolve(userInfo.username)
    })
  }  catch (error) {
    console.log(error)
    const couldNotGetEmail = `We have failed to get the user's email information!`
    return new Promise((resolve, reject) => {
      reject(couldNotGetEmail)
    })
  }
}
