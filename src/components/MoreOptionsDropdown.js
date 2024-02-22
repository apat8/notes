import { faEdit, faEllipsis, faFileEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { forwardRef } from 'react';
import { Dropdown } from 'react-bootstrap';

const MoreOptionsDropdown = ({onEditClick, onMoveToTrashClick}) => {

    const Toggle = forwardRef(({ children, onClick }, ref) => (
        <div
        className='p-2'
        ref={ref}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          onClick(e);
        }}
      >
          <FontAwesomeIcon icon={faEllipsis} size='lg' className='color-navy'/>
          {children}
      </div>
    ));

    return (
        <Dropdown className='more-card-options z-3'>
            <Dropdown.Toggle as={Toggle}></Dropdown.Toggle>
            <Dropdown.Menu> 
                <Dropdown.Item onClick={onEditClick}>
                    <FontAwesomeIcon icon={faEdit} size='lg'></FontAwesomeIcon>
                    <span className='ps-2'>Edit</span>
                </Dropdown.Item>
                <Dropdown.Item onClick={onMoveToTrashClick}>  
                    <FontAwesomeIcon icon={faTrash} size='lg'></FontAwesomeIcon>
                    <span className='ps-2'>Move to trash</span>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default MoreOptionsDropdown;