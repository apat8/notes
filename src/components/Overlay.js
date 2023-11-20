import { Container, Row } from 'react-bootstrap';

const Overlay = ({children}) => {
    return (
        <>
            <Container fluid className='overlay'>
                <Row className='h-100 justify-content-center align-items-center'>   
                    <span className='loading-dot'></span>
                    <span className='loading-dot'></span>
                    <span className='loading-dot'></span>
                </Row> 
            </Container>
        </>
    )
}

export default Overlay;