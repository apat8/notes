import { Col, Container, Placeholder, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useAddNoteMutation } from '../slices/notesApiSlice';
import { useGetCollectionNotesQuery, useGetCollectionQuery } from '../slices/collectionApiSlice';
import AddFAB from '../components/AddFAB';
import NoData from '../components/NoData';
import NoteCard from '../components/NoteCard';
import noDataSVG from '../assets/no_data.svg';

const CollectionScreen = () => {
    const navigate = useNavigate();
    const {collectionID} = useParams();

    const {data: collection, isLoading: isLoadingCollection} = useGetCollectionQuery(collectionID);
    const [addNote] = useAddNoteMutation();
    
    const {data: notes, error, isLoading} = useGetCollectionNotesQuery(collectionID, {
        selectFromResult: ({data, error, isLoading}) => ({
            data: data?.filter((note) => !note.isTrash),
            error,
            isLoading
        })
    });

    const handleOnNewNoteClick = async () => {
        const res = await addNote({collectionID});
        navigate(`/notes/${res.data.note._id}`);
    }

    const handleBackNavigation = () => {
        navigate(-1);
    }

    return (
        <div className='scrollbar-gutter-stable p-3 h-100'>
            <Container className="h-100">
                <Row className='h-100'>
                    <Col className='h-100 d-flex flex-column pb-5'>
                        <Row className='mb-3 align-items-center'>
                            <Col xs='auto' className='pe-3'>
                                <span className='color-navy back-btn' onClick={handleBackNavigation}>
                                    <FontAwesomeIcon size='xl' color='color-navy' icon={faArrowLeft}/>
                                </span>
                            </Col>
                            <Col xs={9} className='p-0'>
                                <span className='icon-link color-navy'>
                                    <FontAwesomeIcon icon={faFolder}/>
                                    <h5 className='m-0'>Collections / {isLoadingCollection ? (<Placeholder />) : collection?.title}</h5>
                                </span>
                            </Col>
                            <Col xs={{offset:'12'}} className='text-end'>
                                <span className='icon-link color-navy'>
                                    {notes?.length === 1 ?  notes?.length + ' note' : notes?.length + ' notes' } 
                                </span>
                            </Col>
                        </Row>
                        <Row className='flex-grow-1 gy-3 pb-5'>
                            {isLoading ? (
                                    <Placeholder xs={12} className='h-100'></Placeholder>
                                ) : notes?.length === 0 ? (
                                    <NoData 
                                        message='No notes'
                                        image={noDataSVG}/>
                                ) : ( 
                                    notes?.map((note, i) => {
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
                                ) 
                            }
                        </Row>
                    </Col>
                </Row>
            </Container>

            <AddFAB onClick={handleOnNewNoteClick} /> 
        </div>
    )
}

export default CollectionScreen;