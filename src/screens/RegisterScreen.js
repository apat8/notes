import { Col, Container, Row, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import takingNotes from '../assets/taking_notes.svg';
import PillButton from "../components/PillButton";
import AuthNavBar from "../components/AuthNavBar";
import AuthCard from "../components/AuthCard";
import AuthErrorMessage from "../components/AuthErrorMessage";
import FormInput from "../components/FormInput";
import FormInputPassword from "../components/FormInputPassword";
import Overlay from "../components/Overlay";

const RegisterScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const [register, {isLoadingRegister}] = useRegisterMutation();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        // If already logged in, go to main page
        if(userInfo){
            navigate('/main');
        }
    }, [navigate, userInfo]);

     // Update state of form input field and clear error message 
    const formInputChangeHandler = (stateSetFunc, value) => {
        stateSetFunc(value);
        
        if(errorMessage){
            setErrorMessage("");
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        // Validate inputs
        if(!name || !email || !password || !confirmPassword) {
            setErrorMessage('All fields are requried');
            return;
        }

        if(password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        try {
            setErrorMessage('');
            const res = await register({name, email, password}).unwrap();
            dispatch(setCredentials(res));
        } catch (err) {
            setErrorMessage(err?.data?.message);
            console.log(err?.data?.message);
        }
    }

    return(
       <> 
            {isLoadingRegister ? <Overlay /> : null}

            <div  className='auth-background'>
                <Container className='d-flex flex-column auth-container'>
                    <AuthNavBar/>

                    <Row className='align-items-start'>
                        <Col lg='6' className='d-none d-lg-block' style={{marginTop:'10%'}}>
                            <img src={takingNotes} alt='right panel notes' width='100%'/>
                        </Col>
                        <Col xs='12' lg='6'>
                            <AuthCard title='Create an account' errorMessage={errorMessage}>
                                <Form onSubmit={submitHandler}>
                                    <Form.Group className='mb-3'>
                                        <Form.Label className='label'>Name</Form.Label>
                                        <FormInput 
                                            type='text'
                                            placeholder='Enter Name'
                                            onChange={(e) => formInputChangeHandler(setName, e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className='mb-3'>
                                        <Form.Label className='label'>Email</Form.Label>
                                        <FormInput 
                                            type='email'
                                            placeholder='Enter Email'
                                            onChange={(e) => formInputChangeHandler(setEmail, e.target.value)}/>
                                    </Form.Group>
                                    <Form.Group className='mb-3'>
                                        <Form.Label className='label'>Password</Form.Label>
                                        <FormInputPassword 
                                            placeholder='Enter Password'
                                            onChange={(e) => formInputChangeHandler(setPassword, e.target.value)}/>
                                    </Form.Group >
                                    <Form.Group className={`${errorMessage ? 'mb-4' : 'mb-4 mb-md-5 mb-lg-5'}`}>
                                        <Form.Label className='label'>Confirm Password</Form.Label>
                                        <FormInputPassword 
                                            placeholder='Re-enter Password'
                                            onChange={(e) => formInputChangeHandler(setConfirmPassword, e.target.value)}/>
                                    </Form.Group>

                                    {errorMessage ? 
                                        <AuthErrorMessage>{errorMessage}</AuthErrorMessage>:
                                        null
                                    }
                                    <Row className='justify-content-center'>
                                        <Col className='text-center'>
                                            <PillButton type='submit'><h5 className='m-0 px-3'>Register</h5></PillButton>
                                        </Col>
                                    </Row>
                                    <Row className='justify-content-center'>
                                        <Col className='mt-4 text-center fs-6 fw-semibold'>
                                            <Form.Text>Already have an account? <Link to='/login' style={{color:'orange'}}>Login</Link></Form.Text>
                                        </Col>
                                    </Row>
                                </Form>
                            </AuthCard>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>    
    )
}

export default RegisterScreen;