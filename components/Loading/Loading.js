import React, { useEffect } from 'react'
import styled from 'styled-components'
import styles from './Loading.module.css'
import Head from 'next/head'
import {ClipLoader} from 'react-spinners'

function Loading() {
    useEffect(() => {
        document.title = 'Whatsapp | Loading...'
    }, [])
    return (
        <div className={styles.loading}>
            <div className={styles.loading_container}>
                <img src='https://firebasestorage.googleapis.com/v0/b/whatsapp-c333e.appspot.com/o/logo%2Fwhatsapp.png?alt=media&token=69a4651b-bf6a-489f-b4d8-7c09193d0a4a' alt="whatsapp logo" height={200} width={200} style={{marginBottom: 10}} />
                <ClipLoader color='#56c79d' size={50} loading={true} />
            </div>
        </div>
    )
}

export default Loading

