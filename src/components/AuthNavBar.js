import { Navbar, Container } from 'react-bootstrap';
import logo from '../assets/logo.svg';

const AuthNavBar = () => {
    return(
        <Navbar className='my-3'>
            <Container className='justify-content-center justify-content-lg-start'>
                <Navbar.Brand>
                    <img src={logo} className='p-0' width={150}  alt='logo'/>
                </Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default AuthNavBar;