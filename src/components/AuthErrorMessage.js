import { Col, Row, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'

const ErrorMessage = ({children}) => {
    return(
        <Row className='justify-content-center mb-4'>
            <Col className='col-11 text-center bg-error py-4 px-3 rounded-4'>
                <FontAwesomeIcon icon={faCircleExclamation} size='lg' className='text-danger'/>
                <Form.Text className='text-danger label ms-3'>{children}. Please try again.</Form.Text>
            </Col>
        </Row>
    )
} 

export default ErrorMessage;