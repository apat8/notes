import { useState } from 'react';
import { Nav, NavItem, Collapse, Placeholder } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faCircle, faFolder, faHouse, faStickyNote, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useGetAllCollectionsQuery } from '../slices/collectionApiSlice';


const Sidebar = () => {
    
    const [isOpen, setIsOpen] = useState(true);
    
    const {data: collections, isLoading: isLoadingCollections} = useGetAllCollectionsQuery();

    const collapseArrowStyle = {
        transform: isOpen ? 'rotate(180deg)' : '', 
        transition: 'transform 350ms ease', // smooth transition
    }

    return(
        <Nav variant='pills' className='flex-column h-100 sidebar px-2 pt-2 w-100 scrollbar-gutter-stable'>
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
                <Nav.Link as={NavLink}
                    onClick={() => setIsOpen(!isOpen)}
                    to='/collections'
                >
                    <FontAwesomeIcon icon={faFolder}/>
                    <span className='ms-2'>Collections</span>
                    <FontAwesomeIcon icon={faChevronUp} className='ms-3' style={collapseArrowStyle} />
                </Nav.Link>
                <Collapse in={isOpen}>
                    <div>
                        <Nav className='flex-column'>
                            {isLoadingCollections && <Placeholder/>}
                            {collections  && (collections.map((collection, i) => {
                                return (
                                    <NavItem key={i} className='mx-4'>
                                        <Nav.Link as={NavLink} to={`/collections/${collection._id}`} >
                                            <FontAwesomeIcon icon={faCircle} size='xs' className='me-2' />
                                            {collection.title}
                                        </Nav.Link>
                                    </NavItem> 
                                )
                            }))}
                        </Nav>
                    </div>
                </Collapse>
            </NavItem>
            
        </Nav>      
    )
}

export default Sidebar;