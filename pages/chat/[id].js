import React, { useEffect } from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { chatsCollection } from '@firebase/firebase'
import { currentUser } from '@firebase/firebaseAuth'
import { getParticipantDetails, getParticipantEmails } from 'utils/chatOperation'
import { useRouter } from 'next/router'
const Sidebar = dynamic(()=> import('@/components/Sidebar/Sidebar')) 
const ChatScreen = dynamic(()=> import('@/components/ChatScreen/ChatScreen'))

const Chat = ({chat,messages}) => {
    const user = currentUser();
    const participant = getParticipantDetails(user, chat.participants)
    const router = useRouter()
    return (
        <Container>
            <Head>
                <title>Chat {participant && `| ${participant.displayName}`}</title>
            </Head>
            <Sidebar />
            <ChatContainer>
                <ChatScreen chat={chat} messages={messages} />
            </ChatContainer>
        </Container>
    )
}

export default Chat

export async function getServerSideProps (context) {
    // Get the chat collection with the id of the current link
    const ref = chatsCollection.doc(context.query.id)

    // Get the messages collection in the chat collection, orderBy timestamp in each messages
    const messagesRes = await ref.collection('messages').orderBy('timestamp', 'asc').get()
    
    // 
    const messages = messagesRes.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    })).map(messages => ({
        ...messages,
        timestamp: messages.timestamp.toDate().getTime(),
    }))

    // Prepare the chat
    const chatRes = await ref.get()
    const chat = {
        id: chatRes.id,
        ...chatRes.data()
    }

    // console.table({chat})
    console.log(messages)

    return {
        props: {
            messages: JSON.stringify(messages),
            chat,
        }
    }
}

const Container = styled.div`
    display: flex;
`
const ChatContainer = styled.div`
    flex: 1;
    overflow-y: scroll;
    height: 100vh;
    background-color: whitesmoke;
    ::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`