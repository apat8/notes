import { useState } from 'react';
import { Card } from 'react-bootstrap';
import ReactTimeago from 'react-timeago';
import { timeagoFormatter } from '../utils/formatDate';
import MoreOptionsDropdown from './MoreOptionsDropdown';
import MoveToTrashModal from './MoveToTrashModal';
import CollectionModal from './CollectionModal';
import { useNavigate } from 'react-router-dom';

const CollectionCard = ({collectionID, title, isTrash, updatedAt}) => {
    const navigate = useNavigate();

    const [showCollectionModal, setShowCollectionModal] = useState(false);
    const [showMoveToTrashModal, setShowMoveToTrashModal] = useState(false);

    const handleShowMoveToTrashModal = (e) => {
        e.stopPropagation();        
        setShowMoveToTrashModal(true);
    }  

    const handleShowCollectionModal = (e) => {
        e.stopPropagation();        
        setShowCollectionModal(true);
    }
    
    const handleCollectionModalOnClose = () => {
        setShowCollectionModal(false);
    }

    const handleCollectionNavigation = (e) => {
        e.stopPropagation();
        navigate(`/collections/${collectionID}`);
    }

    return (
        <>
        <svg className="svg">
            <clipPath id="folder-clip-path" clipPathUnits="objectBoundingBox"><path d="M0,0 L0.8,0 C0.925,0.1,0.875,0.32,1,0.36 L0,1"></path></clipPath>
        </svg>
        <div onClick={!isTrash ? handleCollectionNavigation : undefined} className='cursor-pointer'>
            <Card className='rounded-4 border border-0 collection-card'>
                <Card.Body className='h-100 p-4 d-flex flex-column justify-content-between'>
                    <Card.Title className='mb-4'>
                        <h5 className='fw-bold'>{title}</h5>                    
                    </Card.Title>
                    <footer className='d-flex justify-content-between align-items-end'>
                        <small className="text-muted"><ReactTimeago date={updatedAt}  minPeriod='30' formatter={timeagoFormatter}/></small>
                        <MoreOptionsDropdown 
                            onEditClick={handleShowCollectionModal}
                            onMoveToTrashClick={handleShowMoveToTrashModal}
                            />
                    </footer>
                </Card.Body>
            </Card>
        </div>

        <CollectionModal 
            showCollectionModal={showCollectionModal}
            onClose={handleCollectionModalOnClose}
            isEditMode
            collectionID={collectionID}
            collectionName={title}
        />

        <MoveToTrashModal 
            collectionID={collectionID} 
            showModal={showMoveToTrashModal}
            setShowModal={setShowMoveToTrashModal}
        />
        </>
    )
}

export default CollectionCard;