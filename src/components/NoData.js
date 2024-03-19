import { Container, Row, Col } from 'react-bootstrap';

const NoData = ({message, image}) => {
    return (
        <Container className='h-100'>
            <Row className='h-100 align-items-center'>
                <Col>
                    <Row className='text-center'>
                        <Col>
                            <img src={image} alt='no data' width='40%' className='pb-4 opacity-50' />
                        </Col>
                    </Row>
                    <Row className='text-center mt-3'>
                        <Col>
                            <h1 className='color-navy fw-bold opacity-25'>{message}</h1>
                        </Col>
                    </Row>                                             
                </Col>
            </Row> 
        </Container>
    )
}

export default NoData;