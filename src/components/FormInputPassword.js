import { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const FormInputPassword = ({className, placeholder, onChange}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <InputGroup className='rounded-pill input-group-password'>
            <Form.Control 
                className={`rounded-start-pill border-end-0 form-input-password ${className}`}
                type={showPassword ? 'text' : 'password'} 
                placeholder={placeholder}
                onChange={onChange}/>
            <Button className='rounded-end-pill border-start-0 btn-eye' tabIndex='-1' onClick={() => setShowPassword(!showPassword)}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} size='lg'/>   
            </Button>
        </InputGroup>
    )
}

export default FormInputPassword;