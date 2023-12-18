import { Navbar, Nav, NavDropdown, Container, Form } from 'react-bootstrap';
import logo from '../assets/logo.svg';
import FormInput from './FormInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [ logoutMutation ] = useLogoutMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const logoutHandler = async () => {
        try {
            await logoutMutation().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    } 

    return(
        <Navbar className='h-100 justify-content-between' bg='white' variant='white'>
            <Container fluid>
                <Navbar.Brand>
                    <img src={logo} className='p-0' width={120}  alt='logo'/>
                </Navbar.Brand>
                <Form className='w-50'>
                    <span className='position-relative'>
                        <FontAwesomeIcon icon={faSearch} color='#4C4965' className='position-absolute' style={{left:'1rem', top:'0.65rem'}}/>
                        <FormInput type='search' placeholder='Search' className='search-input'/>
                    </span>
                </Form>
               
                <Nav>
                    <NavDropdown align='end' title={
                            <span>
                                <span className='circle me-2'>{userInfo.name.charAt(0)}</span>
                                <span className='fw-bold color-navy'>{userInfo.name}</span>
                            </span>
                            } id='nav-dropdown' className='me-auto'>
                        <NavDropdown.Item href='/profile' className='mb-1'>
                                <FontAwesomeIcon icon={faUserCircle} size='lg'></FontAwesomeIcon>
                                <span className='ps-2'>Porfile</span>
                            </NavDropdown.Item>
                        <NavDropdown.Item onClick={logoutHandler}>
                            <FontAwesomeIcon icon={faRightFromBracket} size='lg'></FontAwesomeIcon>
                                <span className='ps-2'>Logout</span>
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
               
            </Container>
        </Navbar>
    )
}

export default NavBar;