import { Avatar, Button, IconButton, ListItem, List } from '@material-ui/core'
import {MoreVert, Search } from '@material-ui/icons'
import ChatIcon from '@material-ui/icons/Chat';
import React, { useEffect, useState } from 'react'
import ModalComponent from '../ModalComponent/ModalComponent'
import * as EmailValidator from 'email-validator'
import { auth, chatsCollection, db } from '../../firebase/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import SidebarModal from './SidebarModal/SidebarModal'
import Chat from './Chat/Chat'
import { useCollection } from 'react-firebase-hooks/firestore'
import styles from './Sidebar.module.css'
import { useRouter } from 'next/router';
import DialogComponent from '../DialogComponent/DialogComponent';
import SidebarHeader from './SidebarHeader/SidebarHeader';

function Sidebar() {
    const router = useRouter()
    const [user] = useAuthState(auth)
    const [visible, setVisible] = useState(false)
    const selectNewChat = () => {
        setVisible(true)
    }
    const userChatRef = chatsCollection.where('participants', 'array-contains', user.email)
    const [chatSnapshots] = useCollection(userChatRef)
    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <SidebarHeader user={user} />

                    <div className={styles.icon_container}>
                        <IconButton>
                            <ChatIcon />
                        </IconButton>
                        <IconButton>
                            <MoreVert />
                        </IconButton>
                        
                    </div>
                </div>

                {/* Search  */}
                <div className={styles.search_container}>
                    <Search />
                    <input className={styles.search_input} />
                </div>

                {/* New chat button */}
                <button className={styles.sidebar_button} onClick={selectNewChat}>
                    Start a new conversation
                </button>

                {/* Find New Chat Modal */}
                <SidebarModal visible={visible} setVisible={setVisible} />

                {/* List of chats */}
                {chatSnapshots?.docs.map((chat) => (
                    <Chat key={chat.id} id={chat.id} users={chat.data().participants} />
                ))}
            </div>
        </>
    )
}

export default Sidebar