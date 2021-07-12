import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyBs4ud3aS6wiy0aqjHMHi7q2KgrIuC7tzg",
    authDomain: "whatsapp-c333e.firebaseapp.com",
    projectId: "whatsapp-c333e",
    storageBucket: "whatsapp-c333e.appspot.com",
    messagingSenderId: "980804918149",
    appId: "1:980804918149:web:9f8360c2ef7b250de9c2ec",
    measurementId: "G-ZT46WYSKKN"
}

const initFirebase = () => {
    if (!firebase.apps.length) {
        const app = firebase.initializeApp(config)
        return app
    } else {
        return firebase.app()
    }
}
const app = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app()
const db = app.firestore()
const auth = app.auth()
const googleLogin = new firebase.auth.GoogleAuthProvider()
const chatsCollection = db.collection('chats')
const usersCollection = db.collection('users')
export {db, auth, googleLogin, chatsCollection, usersCollection}
export default app