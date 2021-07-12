import DialogComponent from '@/components/DialogComponent/DialogComponent'
import { logout } from '@firebase/firebaseAuth'
import { Avatar, List, ListItem } from '@material-ui/core'
import React, { useState } from 'react'
import styles from './SidebarHeader.module.css'

function SidebarHeader({user}) {
    const [userDialog, setUserDialog] = useState(false)
    const userDialogSwitch = {
        open: () => setUserDialog(true),
        close: () => setUserDialog(false),
        oc: () => setUserDialog(!userDialog)
    }
    return (
        <>
            <Avatar className={styles.UserAvatar} src={user.photoURL} onClick={userDialogSwitch.oc} />
            <DialogComponent open={userDialog} onClose={userDialogSwitch.oc} >
                <List>
                    <ListItem button> Hi, {user.displayName} </ListItem>
                    <ListItem button onClick={() => {
                        logout()
                        console.log('Logging out')
                    }}> Logout </ListItem>
                </List>
            </DialogComponent>
        </>
    )
}

export default SidebarHeader
