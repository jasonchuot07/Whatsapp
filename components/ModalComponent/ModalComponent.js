import React from 'react'
import { Modal } from 'antd';

function ModalComponent({children,title, visible, onOk, handleCancel}) {
    return (
        <Modal title={title} visible={visible} onOk={onOk} onCancel={handleCancel}>
            {children}
        </Modal>
    )
}

export default ModalComponent
