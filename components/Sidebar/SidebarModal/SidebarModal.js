import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import styled from 'styled-components'
import { auth, chatsCollection, usersCollection } from '../../../firebase/firebase'
import DialogComponent from '@/components/DialogComponent/DialogComponent'
import * as EmailValidator from 'email-validator'
import ColorPicker from '../../ColorPicker/ColorPicker'
import { useCollection } from 'react-firebase-hooks/firestore'
import { TextField } from '@material-ui/core';

export default function SidebarModal({visible, setVisible}) {
    const [user] = useAuthState(auth)
    const [inputValue, setInputValue] = useState('')
    const [filteredEmail, setFilteredEmail] = useState([])
    const [searchedUsers, setSearchedUsers] = useState([])
    const [primaryColor, setPrimaryColor] = useState({
        color: {r: 150,g: 150,b: 150,a: 1,},
        open: false
    })
    const [chosenUser, setChosenUser] = useState({email: ''})
    const userChatRef = chatsCollection.where('creator', '==', user.email)
    const [chatSnapshots] = useCollection(userChatRef)

    useEffect(()=>{
        getUsers()
    },[])

    useEffect (() => {
        getFilteredEmail()
    }, [inputValue])

    // Get All Users
    const getUsers = () => {
        usersCollection.get().then(data => {
            const newData = data.docs.map(doc => {
                if (doc.exists) return doc.data()
            })
            return setSearchedUsers(newData)
        })
    }
    
    // Get Filtered Email
    const getFilteredEmail = () => {
        if (inputValue.length > 0) {
            setFilteredEmail(searchedUsers.filter(user => {
                if (user.email.includes(inputValue)) {
                    return user
                } else {
                    setFilteredEmail([])
                }
            }))
        } else {
            setFilteredEmail([])
        }
    }

    const selectChosenUser = (currentUser) => {
        if(!chosenUser.email || chosenUser.email !== currentUser.email) {
            setChosenUser(currentUser)
        } else {
            setChosenUser({})
        }
    }

    // Check for existing chat
    const getExistingChat = (recipient) =>
        // Check in the chatsnapshots if the chat.data().participants.find(user => user ===)
        !!chatSnapshots?.docs.find(chat => chat.data().participants.find(user => user === recipient)?.length > 0)

    // When there are no emails matched
    const noEmailsFound = (component) => {
        if (inputValue.length > 0 && filteredEmail.length == 0) {
            return component
        }
    }
    
    const confirmNewChat = () => {
        if (EmailValidator.validate(chosenUser.email) && !getExistingChat(chosenUser.email)) {
            setVisible(false)
            setFilteredEmail([])
            setSearchedUsers([])
            setInputValue('')
            setChosenUser({})
            chatsCollection.add({
                creator: user.email,
                participants: [chosenUser.email, user.email]
            }).then(() => console.log('Chat Added')).catch(err => console.error(err));
        }
    }
    
    return (
        <DialogComponent title="Who are you looking for ?" content open={visible} confirm={confirmNewChat} onClose={()=>{
            setChosenUser({})
            setFilteredEmail([])
            setVisible(false)
        }}>
            <div>
                {chosenUser.email && <div style={{marginBottom:'15px'}}>Chosen Person: {chosenUser.displayName}</div> }
                <TextField onChange={(e)=> setInputValue(e.target.value)} required id="outlined-required" label="Enter new Email" variant="outlined" />
                {/* <ModalInput onChange={(e)=> setInputValue(e.target.value)} /> */}
            </div>
            
            
            {filteredEmail.length > 0 && <div style={{marginTop: 10}}>
                <h3 style={{marginBottom:'15px'}}>Emails found:</h3>
                {filteredEmail.map((user, i)=>{ return <div key={i}> 
                    
                    <EmailsContainer style={{backgroundColor: i%2 === 0 ? 'ghostwhite' : 'white'}} 
                    onClick={() => selectChosenUser(user)} >
                        <EmailsImage> <img src={user.photoURL} alt={user.email} /> </EmailsImage>
                        <EmailsText> {user.email}</EmailsText>
                        {/* {i === 0 &&  <ColorPicker object={primaryColor} setObject={setPrimaryColor} />} */}

                    </EmailsContainer>
                </div>})}
            </div>} 
            {noEmailsFound(<div style={{color: 'red', marginTop: '15px'}}>No emails found</div>)}
        </DialogComponent>
    )
}

const ModalInput = styled.input`
    border: 1px solid #f0f0f0;
`

const EmailsContainer = styled.button`
    display: flex;
    width: 100%;
    align-items: center;
    border: 1px solid #f0f0f0;
    padding: 12px;
    border-radius: 7px;
    margin-bottom: 10px;
`

const EmailsText = styled.div`
    font-size: 14px;
    font-weight: 500;
`

const EmailsImage = styled.div`
    img {
        margin-right: 20px;
        border-radius: 50%;
        height: 30px;
        width: 30px;
        object-fit: cover;
    }
`