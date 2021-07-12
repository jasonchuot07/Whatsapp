import Head from 'next/head'
import React from 'react'
import {Button} from '@material-ui/core'
import { auth, googleLogin } from '../../firebase/firebase'
import styles from './login.module.css'

function Login() {
    const signIn = () => {
        auth.signInWithPopup(googleLogin).catch(alert)
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>Whatsapp | Login</title>
            </Head>

            <div className={styles.login_container}>
                <h1>Whatsapp Login</h1>
                <img className={styles.logo} src='https://firebasestorage.googleapis.com/v0/b/whatsapp-c333e.appspot.com/o/logo%2Fwhatsapp.png?alt=media&token=69a4651b-bf6a-489f-b4d8-7c09193d0a4a' alt="whatsapp logo" />
                <Button onClick={signIn} variant='outlined'>Sign in with Google</Button>
            </div>
        </div>
    )
}

export default Login