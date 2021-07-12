import Head from 'next/head'
import Image from 'next/image'
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
                <Image className={styles.logo} src='/public/whatsapp.png' alt="whatsapp logo" />
                <Button onClick={signIn} variant='outlined'>Sign in with Google</Button>
            </div>
        </div>
    )
}

export default Login