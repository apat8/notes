import { Button } from 'react-bootstrap';

const PillButton = ({type, children}) => {
    return(
        <Button 
            type={type ? type : 'button'}
            variant='orange' 
            className='rounded-pill px-4 py-2'
            >
                {children}
        </Button>
    )
}

export default PillButton;