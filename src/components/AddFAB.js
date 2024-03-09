import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddFAB = ({toggleRef, onClick, children}) => {

    return (
        <div
          className='d-flex justify-content-center align-items-center cursor-pointer bg-orange rounded-circle shadow z-3 position-fixed bottom-0 end-0 mb-3 me-4'
          style={{width: '3.5rem', height:'3.5rem'}}
          ref={toggleRef}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            onClick(e);
          }}
        >
            <FontAwesomeIcon icon={faPlus} size='2x' color='white'/>
            {children}
        </div>
    )
}

export default AddFAB;