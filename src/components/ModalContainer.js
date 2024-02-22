import { Modal } from 'react-bootstrap';

const ModalContainer = ({showModal, handleClose, children}) => {
    return (
        <Modal show={showModal} centered onHide={handleClose} contentClassName='rounded-4 p-3'>
            {children}
        </Modal>
    )
}

export default ModalContainer;