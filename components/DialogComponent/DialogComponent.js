import { Dialog, DialogTitle, DialogContent, DialogText, Button, DialogActions } from '@material-ui/core'
import React, { useState } from 'react'
import styles from './DialogComponent.module.css'

function DialogComponent({children, open, onClose, title, confirm, content}) {
    const [scroll, setScroll] = useState('paper');
    return (
        <Dialog fullWidth maxWidth="xs" scroll={scroll} open={open} onClose={onClose}>
            {title && <DialogTitle>
                {title}
            </DialogTitle>}
            {content ? <DialogContent dividers={scroll == 'paper'}>
                {children}
            </DialogContent> : <>{children}</> }
            <DialogActions>
                {onClose && <Button color="secondary" onClick={onClose}>Close</Button>}
                {confirm && <Button color="primary" onClick={() => {
                    confirm()
                    onClose()
                }}>Start Chat</Button>}
            </DialogActions>
        </Dialog>
    )
}

export default DialogComponent
