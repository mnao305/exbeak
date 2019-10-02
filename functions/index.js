const functions = require('firebase-functions')
const admin = require('firebase-admin')
const Twitter = require('twit')
const cors = require('cors')({ origin: true })
admin.initializeApp()

exports.tweet = functions.region('asia-northeast1').https.onRequest((request, response) => {
  cors(request, response, async () => {
    if (request.method !== 'POST') {
      response.status(405).send('Method Not Allowed')
      return
    } else if (!request.header('Authorization')) {
      response.status(401).send('Unauthorized')
      return
    } else if (!request.body || !request.body.tweet) {
      response.status(400).send('Bad Request')
      return
    }

    const idToken = request.header('Authorization').split(' ')[1]
    let userData
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken)
      const userDocs = await admin
        .firestore()
        .collection('users')
        .doc(decodedToken.uid)
        .get()
      userData = userDocs.data()
    } catch (error) {
      response.status(401).send(error)
      return
    }

    try {
      const client = new Twitter({
        consumer_key: functions.config().twitter.apikey,
        consumer_secret: functions.config().twitter.apisecret,
        access_token: userData.accessToken,
        access_token_secret: userData.secret,
      })
      const tweetRes = await client.post('statuses/update', {
        status: request.body.tweet,
      })
      response.send(tweetRes.data)
    } catch (error) {
      response.status(500).send(error)
    }
  })
})
