import { useState } from 'react';
import { Card, Modal, Form, Row, Col } from 'react-bootstrap';
import ReactTimeago from 'react-timeago';
import { timeagoFormatter } from '../utils/formatDate';
import ModalContainer from './ModalContainer';
import PillButton from './PillButton';
import FormInput from './FormInput';
import { useUpdateCollectionMutation } from '../slices/collectionApiSlice';
import MoreOptionsDropdown from './MoreOptionsDropdown';
import MoveToTrashModal from './MoveToTrashModal';

const CollectionCard = ({collectionID, title, updatedAt}) => {

    const [showEditCollectionModal, setShowEditCollectionModal] = useState(false);
    const [showMoveToTrashModal, setShowMoveToTrashModal] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(title);
    const [isError, setIsError] = useState(false);

    const [updateCollection, {isLoading}] = useUpdateCollectionMutation();

    const handleShowMoveToTrashModal = (e) => {
        e.stopPropagation();        
        setShowMoveToTrashModal(true);
    }  

    const handleShowEditCollectionModal = (e) => {
        e.stopPropagation();        
        setShowEditCollectionModal(true);
    }  

    const handleUpdateCollection = async () => {
        if(updatedTitle != title) {
            const res = await updateCollection({id: collectionID, title: updatedTitle}).unwrap();
            setShowEditCollectionModal(false);
        }
        else {
            setIsError(true);
        }
    }

    const handleTitleOnChange = (e) => {
        setUpdatedTitle(e.target.value);
        setIsError(false);
    }

    const handleModalOnClose = () => {
        setShowEditCollectionModal(false);
        setIsError(false);
    }

    const handleCollectionNavigation = (e) => {
        e.stopPropagation();
        console.log(updatedAt);
    }

    return (
        <>
        <svg className="svg">
            <clipPath id="folder-clip-path" clipPathUnits="objectBoundingBox"><path d="M0,0 L0.8,0 C0.925,0.1,0.875,0.32,1,0.36 L0,1"></path></clipPath>
        </svg>
        <div onClick={handleCollectionNavigation} className='cursor-pointer'>
            <Card className='rounded-4 border border-0 collection-card'>
                <Card.Body className='h-100 p-4 d-flex flex-column justify-content-between'>
                    <Card.Title className='mb-4'>
                        <h5 className='fw-bold'>{title}</h5>                    
                    </Card.Title>
                    <footer className='d-flex justify-content-between align-items-end'>
                        <small className="text-muted"><ReactTimeago date={updatedAt}  minPeriod='30' formatter={timeagoFormatter}/></small>
                        <MoreOptionsDropdown 
                            onEditClick={handleShowEditCollectionModal}
                            onMoveToTrashClick={handleShowMoveToTrashModal}
                            />
                    </footer>
                </Card.Body>
            </Card>
        </div>

        <MoveToTrashModal 
            collectionID={collectionID} 
            showModal={showMoveToTrashModal}
            setShowModal={setShowMoveToTrashModal}
        />
        </>
    )
}

export default CollectionCard;