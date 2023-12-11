import { Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import NavBar from './NavBar';
import Sidebar from './Sidebar';

const MainLayout = () => {
    return(    
        <Container fluid className='vh-100 d-flex flex-column overflow-hidden'>
            <Row style={{height:'7vh'}}>
                <Col className='p-0 h-100'>
                    <NavBar/>
                </Col>
            </Row>
            <Row style={{height:'93vh'}}>
                <Col xs={2} className='p-0 h-100 overflow-y-auto'>
                    <Sidebar />
                </Col>
                <Col xs={10} className='h-100 overflow-y-auto main-content-container'>
                    <Outlet />
                </Col>
            </Row>
        </Container>            
    )
}

export default MainLayout;