import { useParams } from 'react-router-dom';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import useDebounceCallback from '../hooks/useDebounceCallback';
import { useUpdateNoteMutation } from '../slices/notesApiSlice';

const AutoSavePlugin = () => {
    const { noteID } = useParams();
    
    const [updateNote, {isLoading}] = useUpdateNoteMutation();

    const onChange = useDebounceCallback(async (editorState) => {
        const serializedState = JSON.stringify(editorState);
        const res = await updateNote({id: noteID, content: serializedState}).unwrap();
    }, 5000);
    
    return(
        <OnChangePlugin onChange={onChange} ignoreSelectionChange/>        
    )
}

export default AutoSavePlugin;