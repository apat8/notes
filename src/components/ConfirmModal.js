import { Modal } from 'react-bootstrap';
import PillButton from './PillButton';
import ModalContainer from './ModalContainer';

const ConfirmModal = ({
        title,
        message,
        image,
        showModal, 
        handleClose, 
        handleAction, 
        actionButtonName }) => {
    return (
        <ModalContainer showModal={showModal} handleClose={handleClose}>
            <Modal.Header className='border border-0 text-center flex-column'>
                <img src={image} alt='right panel notes' width='60%' className='pb-4' />
                <Modal.Title className='fw-bold fs-2'>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='pt-0'>{message}</Modal.Body>
            <Modal.Footer className='border border-0 text-center justify-content-center'>
                <PillButton onClick={handleClose}>
                    Close
                </PillButton>
                <PillButton onClick={handleAction}>
                    {actionButtonName}
                </PillButton>
            </Modal.Footer>
        </ModalContainer>
    )
}

export default ConfirmModal;