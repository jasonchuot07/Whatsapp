import '../styles/globals.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import app, {auth, db, usersCollection} from '../firebase/firebase'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import firebase from 'firebase'
import { useRouter } from 'next/router'
const Loading = dynamic(()=> import('@/components/Loading/Loading')) 
const Login = dynamic(()=> import('@pages/login/index'))
import { unsubscribe } from '@firebase/firebaseAuth'
import { printBug } from 'utils/debugTool'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [user,loading,error] = useAuthState(app.auth())
  const [currentUser, setCurrentUser] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [userReady, setUserReady] = useState(false)
  useEffect(()=> {
    
    if (user) {
      usersCollection.doc(user.uid).set({
        email: user.email,
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        photoURL: user.photoURL,
        displayName: user.displayName,
        uid: user.uid,
      }, {merge: true})
    }
    setIsLoading(false)
  },[user])

  if (isLoading) return <Loading /> 
  if (!user) return <Login />
  return <>
    <Component {...pageProps} />
  </>
}

export default MyApp
