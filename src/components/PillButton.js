import { Button } from 'react-bootstrap';

const PillButton = ({children, className, ...props}) => {
    return(
        <Button 
            {...props}
            variant='orange' 
            className={`rounded-pill px-4 py-2 ${className}`}
            >
                {children}
        </Button>
    )
}

export default PillButton;