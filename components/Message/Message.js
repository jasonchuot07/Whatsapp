import { auth } from '@firebase/firebase'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import styled from 'styled-components'
import { Avatar } from "@material-ui/core";
import moment from 'moment'

function Message({user, message}) {
    const [currentUser] = useAuthState(auth)

    const TypeOfMessage = user === currentUser.email ? Sender : Reciever;
    const TimestampDefine = user === currentUser.email ? S_Timestamp : R_Timestamp;

    return (
        <Container>
            {user !== currentUser.email && <Avatar src={message.photoURL} /> }
            <TypeOfMessage>
                {message.message}
                <TimestampDefine>{message.timestamp ? moment(message.timestamp).format('LT') : "..."}</TimestampDefine>
            </TypeOfMessage>
        </Container>
    )
}

export default Message

const Container = styled.div`
    display: flex;
    align-items: center;
`
const MessageElement = styled.p`
    width: fit-content;
    padding: 15px;
    border-radius: 8px;
    margin: 10px;
    min-width: 90px;
    padding-bottom: 22px;
    position: relative;
    text-align: left;
`

const Sender = styled(MessageElement)`
    margin-left: auto;
    background-color: #dcf8c6;
`

const Reciever = styled(MessageElement)`
    background-color: whitesmoke;
`

const Timestamp = styled.span`
    color: grey;
    padding: 10px;
    font-size: 9px;
    position: absolute;
    bottom: 0;
    text-align: right;
`

const R_Timestamp = styled(Timestamp)`
    left: 7px !important;
`
const S_Timestamp = styled(Timestamp)`
    right: 0px !important;
`
