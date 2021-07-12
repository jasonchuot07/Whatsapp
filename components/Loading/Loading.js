import React, { useEffect } from 'react'
import styled from 'styled-components'
import styles from './Loading.module.css'
import Head from 'next/head'
import {ClipLoader} from 'react-spinners'
import Image from 'next/image'

function Loading() {
    useEffect(() => {
        document.title = 'Whatsapp | Loading...'
    }, [])
    return (
        <div className={styles.loading}>
            <div className={styles.loading_container}>
                <Image src='/public/whatsapp.png' alt="whatsapp logo" height={200} width={200} style={{marginBottom: 10}} />
                <ClipLoader color='#56c79d' size={50} loading={true} />
            </div>
        </div>
    )
}

export default Loading

