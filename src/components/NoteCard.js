import { useState } from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ReactTimeago from 'react-timeago';
import { timeagoFormatter } from '../utils/formatDate';
import MoveToTrashModal from './MoveToTrashModal';
import MoreOptionsDropdown from './MoreOptionsDropdown';

const NoteCard = ({noteID, title, content, updatedAt = Date.now()}) => {
    const [showMoveToTrashModal, setShowMoveToTrashModal] = useState(false);
    const navigate = useNavigate();

    const handleShowMoveToTrashModal = (e) => {
        e.stopPropagation();        
        setShowMoveToTrashModal(true);
    }  
    
    const handleEditNoteNavigation = (e) => {
        e.stopPropagation();
        navigate(`/notes/${noteID}`);
    }

    return (
        <>
        <div onClick={handleEditNoteNavigation} className='cursor-pointer'>
            <Card className='rounded-4 shadow border border-0 note-card' style={{height:'12rem'}}>
                <Card.Body className='h-100 p-4 d-flex flex-column justify-content-between'>
                    <div className="">
                        <Card.Title className='mb-2'>
                            <h6 className='fw-bold'>{title}</h6>                    
                        </Card.Title>
                        <Card.Text className='note-card-content'>{content}</Card.Text>
                    </div>

                    <footer className='d-flex justify-content-between align-items-end'>
                        <small className='text-muted'><ReactTimeago date={updatedAt}  minPeriod='30' formatter={timeagoFormatter}/></small>
                        <MoreOptionsDropdown 
                            onEditClick={handleEditNoteNavigation}
                            onMoveToTrashClick={handleShowMoveToTrashModal}
                            />
                    </footer>
                </Card.Body>
            </Card>
        </div>

         <MoveToTrashModal 
                noteID={noteID} 
                showModal={showMoveToTrashModal} 
                setShowModal={setShowMoveToTrashModal}/>
        </>
    )
}

export default NoteCard;