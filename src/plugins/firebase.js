import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyBgv082CK7KBB0DtDTD70agyPorR8eIjxg',
    authDomain: 'exbeak.firebaseapp.com',
    databaseURL: 'https://exbeak.firebaseio.com',
    projectId: 'exbeak',
    storageBucket: 'exbeak.appspot.com',
    messagingSenderId: '747650135184',
    appId: '1:747650135184:web:eb1612d0b3da8317895415',
  })
}

export default firebase
