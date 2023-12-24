import { Nav, NavItem, Collapse } from 'react-bootstrap';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faFolder, faHouse, faStickyNote, faTrash } from '@fortawesome/free-solid-svg-icons';


const Sidebar = () => {
    
    const [isOpen, setIsOpen] = useState(false); 

    const collapseArrowStyle = {
        transform: isOpen ? 'rotate(180deg)' : '', 
        transition: 'transform 350ms ease', // smooth transition
    }

    return(
        <Nav variant='pills' className='flex-column h-100 sidebar p-2 w-100 scrollbar-gutter-stable'>
            <NavItem className='mt-2'>
                <Nav.Link as={NavLink} to='/main' end>
                    <FontAwesomeIcon icon={faHouse}/>
                    <span  className='ms-2 d-none d-sm-inline'>Home</span>
                </Nav.Link>
            </NavItem>
            <NavItem>
                <Nav.Link as={NavLink} to='/notes'>
                    <FontAwesomeIcon icon={faStickyNote}/>
                    <span className='ms-2 d-none d-sm-inline'>Notes</span>
                </Nav.Link>
            </NavItem>
            <NavItem>
                <Nav.Link as={NavLink} to='/trash'>
                    <FontAwesomeIcon icon={faTrash}/>
                    <span className='ms-2'>Trash</span>
                </Nav.Link>
            </NavItem>
            <hr className='w-100 align-self-center'/>

            <NavItem>
                <Nav.Link
                onClick={() => setIsOpen(!isOpen)}
                >
                    <FontAwesomeIcon icon={faFolder}/>
                    <span className='ms-2'>Collections</span>
                    <FontAwesomeIcon icon={faChevronUp} className='ms-5' style={collapseArrowStyle} />
                </Nav.Link>
                <Collapse in={isOpen}>
                    <div>
                    <Nav className='flex-column'>
                       {/* TODO: List collections from DB */}
                    </Nav>
                    </div>
                </Collapse>
            </NavItem>
            
        </Nav>      
    )
}

export default Sidebar;