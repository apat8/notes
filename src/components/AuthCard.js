import { Card } from 'react-bootstrap';

const AuthCard = ({title, errorMessage, children}) => {
    return(
        <Card className={`${errorMessage ? 'card-shake' : null } rounded-4 shadow-lg border border-0 mx-md-5 mb-5`}>
            <Card.Body className='p-4 p-md-5'>
                <Card.Title className='text-center mb-4 mb-md-5'>
                    <h2 className='fw-bold'>{title}</h2>                    
                </Card.Title>
                {children}
            </Card.Body>
        </Card>
    )
}

export default AuthCard;