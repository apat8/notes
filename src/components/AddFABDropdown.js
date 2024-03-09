import { forwardRef } from 'react';
import { Dropdown } from 'react-bootstrap';
import { faFolderPlus, faStickyNote } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddFAB from './AddFAB';


const AddFABDropdown = ({onNewNoteClick, onNewCollectionClick}) => {
    const addToggle = forwardRef(({ children, onClick }, ref) => (
        <AddFAB toggleRef={ref} onClick={onClick} children={children}/>
    ));

    return (
        <Dropdown>
            <Dropdown.Toggle as={addToggle} />
            <Dropdown.Menu> 
                <Dropdown.Item as={'button'} onClick={onNewNoteClick}>
                    <FontAwesomeIcon icon={faStickyNote} size='lg'></FontAwesomeIcon>
                    <span className='ps-2'>New Note</span>
                </Dropdown.Item>
                <Dropdown.Item as={'button'} onClick={onNewCollectionClick}>  
                    <FontAwesomeIcon icon={faFolderPlus} size='lg'></FontAwesomeIcon>
                    <span className='ps-2'>New Collection</span>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default AddFABDropdown;