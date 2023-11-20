import { Form } from 'react-bootstrap';

const FormInput = ({className, type, placeholder, onChange}) => {
    return (
        <Form.Control
            className={`rounded-pill form-input ${className}`} 
            type={type} 
            placeholder={placeholder}
            onChange={onChange}/>
    )
}

export default FormInput;