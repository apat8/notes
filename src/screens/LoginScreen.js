import { Col, Row, Container, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import AuthCard from '../components/AuthCard';
import AuthErrorMessage from '../components/AuthErrorMessage';
import PillButton from '../components/PillButton';
import takingNotes from '../assets/taking_notes.svg';
import Overlay from '../components/Overlay';
import AuthNavBar from '../components/AuthNavBar';
import FormInput from '../components/FormInput';
import FormInputPassword from '../components/FormInputPassword';


const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const [login, {isLoading}] = useLoginMutation();

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
            setErrorMessage('');
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        // Validate input
        if(!email || !password) {
            setErrorMessage('Missing email and/or password');
            return;
        }

        try {
            setErrorMessage('');
            const res = await login({email, password}).unwrap();
            dispatch(setCredentials(res));
        } catch (err) {
            setErrorMessage(err?.data?.message);
            console.log(err?.data?.message);
        }
    }

    return(
    <>
        {isLoading ? <Overlay /> : null}

        <div  className='auth-background'>
            <Container className='d-flex flex-column auth-container'>      
                <AuthNavBar />
            
                <Row className='align-items-center'>
                    <Col lg='6' className='align-self-start d-none d-lg-block' style={{marginTop:"10%"}}>
                        <img src={takingNotes} alt='right panel notes' width='100%' />
                    </Col>  
                    <Col xs='12' lg='6'>
                        <AuthCard title='Login to your account' errorMessage={errorMessage}>
                            <Form onSubmit={submitHandler}>
                                <Form.Group className='mb-3'>
                                    <Form.Label className='label'>Email</Form.Label>
                                    <FormInput
                                        type='email' 
                                        placeholder='Enter Email'
                                        onChange={(e) => formInputChangeHandler(setEmail, e.target.value)}/>   
                                </Form.Group>
                                <Form.Group className={`${errorMessage ? 'mb-4' : 'mb-5'}`}>
                                    <Form.Label className='label'>Password</Form.Label>
                                    <FormInputPassword 
                                        placeholder='Enter Password'
                                        onChange={(e) => formInputChangeHandler(setPassword, e.target.value)} />
                                </Form.Group>
                                {errorMessage ?
                                    <AuthErrorMessage>{errorMessage}</AuthErrorMessage>:
                                    null}
                                <Row className='justify-content-center'>
                                    <Col className='text-center'>
                                        <PillButton type='submit'><h5 className='m-0 px-3'>Login</h5></PillButton>
                                    </Col>
                                </Row>
                                <Row className='justify-content-center'>
                                    <Col className='mt-4 text-center fs-6 fw-semibold'>
                                        <Form.Text>Don't have an account? <Link to='/register' style={{color:'orange'}}>Register</Link></Form.Text>
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

export default LoginScreen;