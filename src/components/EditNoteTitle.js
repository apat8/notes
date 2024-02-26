import { useState } from 'react';
import { useUpdateNoteMutation } from '../slices/notesApiSlice';

const EditNoteTitle = ({id, value, isTrash}) => {

    const [title, setTitle] = useState(value);
    const [updateTitle, {isLoading}] = useUpdateNoteMutation();

    const handleOnBlur = async () => {
        if(value !== title){
            await updateTitle({id:id, title: title})
        }
    }

    return (
        <input 
            type='text'
            disabled={isTrash} 
            onBlur={handleOnBlur} 
            className='bg-transparent border border-0 focus-ring shadow-none h3 m-0 h-100' 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} />
    )
}

export default EditNoteTitle;