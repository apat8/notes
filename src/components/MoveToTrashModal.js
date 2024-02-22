import { useNavigate } from 'react-router-dom';
import ConfirmModal from './ConfirmModal';
import moveToTrashSVG from '../assets/move_to_trash.svg'
import { useUpdateNoteMutation } from '../slices/notesApiSlice';
import { useUpdateCollectionMutation } from '../slices/collectionApiSlice';

const MoveToTrashModal = ({collectionID, noteID, showModal, setShowModal}) => {
    const [updateNote, {isLoading}] = useUpdateNoteMutation();
    const [updateCollection] = useUpdateCollectionMutation();
    const navigate = useNavigate();
  
    const handleClose = () => setShowModal(false);

    const handleMoveToTrash = async () => {
        if(noteID) {
            const res = await updateNote({id: noteID, isTrash:true}).unwrap();
            setShowModal(false);
            navigate('/trash', { replace: true });
        }
        else if (collectionID) {
            const res = await updateCollection({id: collectionID, isTrash:true}).unwrap();
            setShowModal(false);
            navigate('/trash', { replace: true });
        }
        
    }

    const modalTitle = collectionID ? 'Trash collection?' : 'Trash note?';
    const modalMessage = collectionID ?
        'This will move the collection and all its notes to the trash.' :
        'This will move the note to the trash.';

    return (
        <ConfirmModal
            title={modalTitle}
            message={`${modalMessage} You will be able to recover it from trash later.`}
            image={moveToTrashSVG}
            showModal={showModal}
            handleClose={handleClose}
            handleAction={handleMoveToTrash}
            actionButtonName='Move to trash'
        />
    )
}

export default MoveToTrashModal;