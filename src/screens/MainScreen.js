import { useState } from 'react';
import { Col, Container, Row, Placeholder } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNoteSticky, faFolder } from '@fortawesome/free-solid-svg-icons';
import CollectionCard from '../components/CollectionCard';
import NoteCard from '../components/NoteCard';
import CollectionModal from '../components/CollectionModal';
import AddFABDropdown from '../components/AddFABDropdown';
import { useAddNoteMutation, useGetAllNotesQuery } from '../slices/notesApiSlice';
import { useGetAllCollectionsQuery } from '../slices/collectionApiSlice';

const MainScreen = () => {
    const navigate = useNavigate();    
    const {data: notes, error, isLoading} = useGetAllNotesQuery(undefined, {
        selectFromResult: ({data, error, isLoading}) => ({
            data: data?.filter((note) => !note.isTrash).slice(0,8),
            error,
            isLoading
        })
    });
    const {data: collections, isLoading: isLoadingCollections} = useGetAllCollectionsQuery(undefined, {
        selectFromResult: ({data, error, isLoading}) => ({
            data: data?.filter((collection) => !collection.isTrash).slice(0,4),
            error,
            isLoading
        })
    });

    const [addNote, {isLoading: isLoadingAddNote}] = useAddNoteMutation();

    const [showCollectionModal, setShowCollectionModal] = useState(false);
    
    const handleCollectionModalOnClose = () => {
        setShowCollectionModal(false);
    }

    const handleOnNewNoteClick = async () => {
        const res = await addNote();
        navigate(`/notes/${res.data.note._id}`);
    }

    return(
        <div className='scrollbar-gutter-stable p-3 h-100'>
            <Container className='h-100'>
                <Row>
                    <Col className='h-100 d-flex flex-column pb-5'>
                        <Row className='mb-4 pb-2 justify-content-between'>
                            <Col xs='auto'>
                                <span className='icon-link color-navy'>
                                    <FontAwesomeIcon icon={faFolder}/>
                                    <h5 className='m-0'>Collections</h5>
                                </span>
                            </Col>
                             <Col xs='auto'>
                                <NavLink to='/collections' className='color-navy'>view all</NavLink>
                            </Col>
                        </Row>
                        <Row className='flex-grow-1 gy-5'>
                            {isLoadingCollections ? (
                                <Placeholder xs={12} className='h-100'></Placeholder>
                            ) : collections && (
                                collections.map((collection, i) => {
                                    return (
                                        <Col  xs={6} lg={4} xl={3} key={i} className='collection-card-wrapper'>
                                            <CollectionCard 
                                                collectionID={collection._id} 
                                                title={collection.title}
                                                updatedAt={collection.updatedAt} />
                                        </Col>
                                    )
                                })
                            ) }
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col className='h-100 d-flex flex-column pb-1'>
                        <Row className='mb-3 justify-content-between'>
                            <Col xs='auto'>
                                <span className='icon-link color-navy'>
                                    <FontAwesomeIcon icon={faNoteSticky}/>
                                    <h5 className='m-0'>Notes</h5>
                                </span>
                            </Col>
                            <Col xs='auto'>
                                <NavLink to='/notes' className='color-navy'>view all</NavLink>
                            </Col>
                        </Row>
                        <Row className='flex-grow-1 gy-3'>
                            {isLoading ? (
                                <Placeholder xs={12} className='h-100'></Placeholder>
                            ) : notes && (
                                notes.map((note, i) => {
                                    return (
                                        <Col xs={6} lg={4} xl={3} key={i}>
                                            <NoteCard 
                                                noteID={note._id} 
                                                title={note.title} 
                                                content={note.content} 
                                                updatedAt={note.updatedAt} 
                                            />
                                        </Col>
                                    )
                                })
                            )}
                        </Row>
                    </Col>                        
                </Row>
            </Container>

            <AddFABDropdown 
                onNewNoteClick={handleOnNewNoteClick}
                onNewCollectionClick={() => setShowCollectionModal(true)}
            />

            <CollectionModal
                showCollectionModal={showCollectionModal}
                onClose={handleCollectionModalOnClose}
            />
        </div>
    )
}

export default MainScreen;