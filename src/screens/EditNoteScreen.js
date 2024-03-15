import { forwardRef, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Col, Container, Dropdown, Row } from 'react-bootstrap';
import ReactTimeago from 'react-timeago';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEllipsisVertical, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useGetNoteQuery } from '../slices/notesApiSlice';
import { timeagoFormatter } from '../utils/formatDate';
import Editor from '../components/Editor';
import EditNoteTitle from '../components/EditNoteTitle';
import MoveToTrashModal from '../components/MoveToTrashModal';

const EditNoteScreen = () => {
    const editorRef = useRef(null);
    const navigate = useNavigate();

    const { noteID } = useParams();
    const {data: note, isLoading} = useGetNoteQuery(noteID);
 
    const [showModal, setShowModal] = useState(false);
    const handleShowMoveToTrashModal = (e) => {
        e.stopPropagation();
        setShowModal(true);
    }

    const handleBackNavigation = () => {
        navigate(-1);
    }

    const moreNoteOptionsToggle = forwardRef(({ children, onClick }, ref) => (
        <div
          className='d-flex justify-content-center px-2'
          ref={ref}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            onClick(e);
          }}
        >
            <FontAwesomeIcon icon={faEllipsisVertical} size='xl' className='color-navy'/>
            {children}
        </div>
    ));

    return(
        <Container className='h-100 d-flex flex-column p-0'>
            {isLoading ? 'Loading' : note && (
            <>
                <Row className='p-3 g-0 align-items-center'>
                    <Col xs='auto' className='pe-3'>
                        <span className='color-navy back-btn' onClick={handleBackNavigation}>
                            <FontAwesomeIcon size='xl' color='color-navy' icon={faArrowLeft}/>
                        </span>
                    </Col>
                    <Col xs={7}>
                        <EditNoteTitle id={note._id} value={note.title} isTrash={note.isTrash} />
                    </Col>
                    <Col className='text-end'>
                        { note &&
                        <p className='text-muted m-0'>Last Edited: <ReactTimeago date={note.updatedAt}  minPeriod='30' formatter={timeagoFormatter}/></p>
                        } 
                    </Col>
                    <Col xs='auto' className='ps-4'>
                        <Row className='g-0'>
                            <Col>
                                <Dropdown className='more-card-options'>
                                    <Dropdown.Toggle as={moreNoteOptionsToggle} />
                                    <Dropdown.Menu> 
                                        <Dropdown.Item onClick={handleShowMoveToTrashModal}>  
                                            <FontAwesomeIcon icon={faTrash} size='lg'></FontAwesomeIcon>
                                            <span className='ps-2'>Move to trash</span>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Row>
                    </Col>
                </Row>            
                <div className='d-flex flex-column position-relative flex-grow-1'>
                    <Editor editorRef={editorRef}/>
                </div>
            </>
            )}

            <MoveToTrashModal 
                noteID={noteID} 
                showModal={showModal} 
                setShowModal={setShowModal}/>
        </Container>
    )
};

export default EditNoteScreen;