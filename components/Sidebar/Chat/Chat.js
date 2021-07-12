import { auth, usersCollection } from '@firebase/firebase'
import { Avatar } from '@material-ui/core'
import { useRouter } from 'next/router'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { getParticipantEmails } from 'utils/chatOperation'
import styles from './Chat.module.css'

function Chat({id, users}) {
    const [user] = useAuthState(auth)
    const router = useRouter()
    const participantEmail = getParticipantEmails(user, users)
    const [participantSnapshot] = useCollection(usersCollection.where('email', '==', participantEmail))
    const participant = participantSnapshot?.docs.[0]?.data()
    const enterChat = () => {
        router.push(`/chat/${id}`)
    }
    return (
        <div className={styles.chat_container} onClick={enterChat}>
            {participant ? <Avatar className={styles.avatar} src={participant.photoURL ? participant.photoURL : participant.email[0]}/> : 
            <Avatar className={styles.avatar}>{participant && participantEmail[0]}</Avatar>}
            <p>{participant && participant.displayName}</p>
        </div>
    )
}

export default Chat
