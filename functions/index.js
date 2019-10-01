const functions = require('firebase-functions')

exports.tweet = functions.region('asia-northeast1').https.onRequest((request, response) => {
  if (request.method !== 'POST') {
    response.send('This is not post request')
  }

  // TODO
  // ツイート処理を書く

  response.send('hogefuga')
})
