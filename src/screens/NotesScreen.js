import { Col, Container, Placeholder, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import NoteCard from '../components/NoteCard';
import { useAddNoteMutation, useGetAllNotesQuery } from '../slices/notesApiSlice';
import AddFAB from '../components/AddFAB';
import noDataSVG from '../assets/no_data.svg';
import NoData from '../components/NoData';

const NotesScreen = () => {
    const navigate = useNavigate();
    
    const {data: notes, error, isLoading} = useGetAllNotesQuery(undefined, {
        selectFromResult: ({data, error, isLoading}) => ({
            data: data?.filter((note) => !note.isTrash),
            error,
            isLoading
        })
    });
    const [addNote] = useAddNoteMutation();

    const handleOnNewNoteClick = async () => {
        const res = await addNote();
        navigate(`/notes/${res.data.note._id}`);
    }

    return(
        <div className='scrollbar-gutter-stable p-3 h-100'>
            <Container className="h-100">
                <Row className='h-100'>
                    <Col className='h-100 d-flex flex-column pb-5'>
                        <Row className='mb-3 justify-content-between align-items-center'>
                            <Col xs='auto'>
                                <span className='icon-link color-navy'>
                                    <FontAwesomeIcon icon={faNoteSticky}/>
                                    <h5 className='m-0'>Notes</h5>
                                </span>
                            </Col>
                            <Col xs='auto'>
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

export default NotesScreen;