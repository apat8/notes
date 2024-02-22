import { Form } from 'react-bootstrap';

const FormInput = ({className, type, placeholder, onChange, ...props}) => {
    return (
        <Form.Control
            {...props}
            className={`rounded-pill form-input ${className}`} 
            type={type} 
            placeholder={placeholder}
            onChange={onChange}/>
    )
}

export default FormInput;