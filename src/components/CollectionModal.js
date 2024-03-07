import { useState } from 'react';
import { Modal, Form, Row, Col } from 'react-bootstrap';
import ModalContainer from './ModalContainer';
import FormInput from './FormInput';
import { useAddCollectionMutation, useUpdateCollectionMutation } from '../slices/collectionApiSlice';
import PillButton from './PillButton';

const CollectionModal = ({showCollectionModal, isEditMode, onClose, collectionID, collectionName}) => {
    const [newCollectionName, setNewCollectionName] = useState(isEditMode ? collectionName : "");
    const [isError, setIsError] = useState(false);
  
    const [updateCollection, {isLoading}] = useUpdateCollectionMutation();
    const [addCollection] = useAddCollectionMutation();

    const handleCollectionNameOnChange = (e) => {
        setNewCollectionName(e.target.value);
        setIsError(false);
    }

    const handleOnClose = () => {
        setIsError(false);
        onClose();
    }
    
    const handleOnActionClick = async () => {
        if(newCollectionName === collectionName || newCollectionName === '') {
            setIsError(true);
        }     
        else{
            if(isEditMode) {
                const res = await updateCollection({id: collectionID, title: newCollectionName}).unwrap();
            }
            else {
                const res = await addCollection({title: newCollectionName});
            }

            onClose();
        }
    }

    const modalTitle = isEditMode ? 'Edit Collection' : 'New Collection';
    const actionButtonLabel = isEditMode ? 'Update' : 'Add';

    return (
        <ModalContainer showModal={showCollectionModal} handleClose={handleOnClose}>
            <Modal.Header className='border border-0 text-center flex-column'>
                <Modal.Title className='fw-bold fs-2'>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='pt-0'>
                <Form>
                    <Form.Group className='mb-3'>
                        <FormInput
                            type='input' 
                            placeholder='Collection Name'
                            value={newCollectionName} 
                            onChange={handleCollectionNameOnChange}/>
                    </Form.Group>
                </Form>
                {isError && 
                    <Row>
                        <Col className='text-center bg-error py-4 px-3 rounded-4'>
                            <Form.Text className='text-danger label' style={{}}>The title must be different from the existing title</Form.Text>
                        </Col>
                    </Row> 
                }
                
            </Modal.Body>
            <Modal.Footer className='border border-0 text-center justify-content-center'>
                <PillButton onClick={handleOnClose}>
                    Close
                </PillButton>
                <PillButton onClick={handleOnActionClick}>
                    {actionButtonLabel}
                </PillButton>
            </Modal.Footer>
        </ModalContainer>
    )
}

export default CollectionModal;