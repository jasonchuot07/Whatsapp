import { auth, chatsCollection, usersCollection } from '@firebase/firebase'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import styled from 'styled-components'
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, InsertEmoticon, Mic, MoreVert } from '@material-ui/icons'
import { useCollection } from 'react-firebase-hooks/firestore'
import Message from '../Message/Message'
import firebase from 'firebase'
import { getParticipantDetails } from "utils/chatOperation";
import TimeAgo from 'timeago-react'

function ChatScreen({chat, messages}) {
    const [user] = useAuthState(auth)
    const router = useRouter()
    const [input, setInput] = useState('')
    const endOfMessageRef = useRef(null)
    // Get the messages
    const [messagesSnapshot] = useCollection(chatsCollection.doc(router.query.id)
    .collection('messages')
    .orderBy('timestamp', 'asc'))

    // Send current message
    const sendMessage = (e) => {
        e.preventDefault()
        usersCollection.doc(user.uid).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        }, {merge: true})
        chatsCollection.doc(router.query.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            sender: user.email,
            photoURL: user.photoURL,
        })
        setInput('')
        scrollToBottom()
    }

    const showMessages = () => {
        if (messagesSnapshot) {
            return messagesSnapshot.docs.map(message => (
                <Message key={message.id} user={message.data().sender} message={{
                    ...message.data(),
                    timestamp: message.data().timestamp?.toDate().getTime()
                }}/>
            ))
        } else {
            return JSON.parse(messages).map(message => (
                <Message key={message.id} user={message.sender} message={message}/>
            ))
        }
    }

    const scrollToBottom = () => {
        endOfMessageRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "start"
        })
    }

    const participant = getParticipantDetails(user, chat.participants)
    
    // console.log(JSON.parse(messages))
    console.log(participant)
    // console.table({chat})

    useEffect(() => {
        scrollToBottom()
    }, [])

    return (
        <Container>
            <Header>
                {participant ? <> 
                    <Avatar src={participant.photoURL} />
                    <HeaderInformation>
                        <h3>{participant.displayName}</h3>
                        <p>Last seen: {participant.lastSeen?.toDate() ? (
                            <TimeAgo datetime={participant.lastSeen.toDate()} />
                        ) : 'Unavailable'}</p>
                    </HeaderInformation> 
                    </> : <>
                    <Avatar />
                    <HeaderInformation>
                        <p>Loading user information ...</p>
                    </HeaderInformation> 
                </>}

                <HeaderIcons>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </HeaderIcons>
            </Header>

            <MessageContainer>
                {/* Show Messages */}
                {showMessages()}
                <EndOfMessage ref={endOfMessageRef} />
            </MessageContainer>

            <Inputcontainer>
                <InsertEmoticon />
                <Input value={input} onChange={(e) => setInput(e.target.value)} />
                <button hidden disabled={!input} type="submit" onClick={sendMessage} >Send Message</button>
                <Mic />
            </Inputcontainer>

        </Container>
    )
}

export default ChatScreen

const Container = styled.div`
`
const Header = styled.div`
    position: sticky;
    background-color: white;
    z-index: 100;
    top: 0;
    display: flex;
    padding: 12px;
    height: 80px;
    align-items: center;
    border-bottom: 1px solid whitesmoke;
`

const HeaderInformation = styled.div`
    margin-left: 15px;
    flex: 1;

    > h3 {
        margin-bottom: 3px;
    }
    > p {
        font-size: 12px;
        font-weight: 500;
        color: grey;
        > * {
            font-size: 12px;
            font-weight: 500;
            color: grey;
        }
    }
`

const HeaderIcons = styled.div``

const MessageContainer = styled.div`
    padding: 30px;
    padding-top: 90px;
    background-color: #e5ded8;
    min-height: 90vh;
`

const EndOfMessage = styled.div`
    margin-top: 50px;
`

const Inputcontainer = styled.form`
    display: flex;
    align-items: center;
    padding: 12px;
    position: sticky;
    bottom: 0;
    background-color: white;
    z-index: 100;
`

const Input = styled.input`
    flex: 1;
    align-items: center;
    padding: 12px;
    position: sticky;
    bottom: 0;
    background-color: whitesmoke;
    padding: 10px;
    margin: 0 15px;
    z-index: 100;
`
