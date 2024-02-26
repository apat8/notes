import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {EditorRefPlugin} from '@lexical/react/LexicalEditorRefPlugin'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import ToolbarPlugin from './ToolbarPlugin'
import AutoSavePlugin from './AutoSavePlugin';
import { useParams } from 'react-router-dom';
import { useGetNoteQuery } from '../slices/notesApiSlice';

const Editor = ({editorRef}) => {
    const theme = {}
    const onError = (error) => {
        console.log(error)
    }

    const { noteID } = useParams();

    const {data: note, isLoading} = useGetNoteQuery(noteID);

    const initialConfig = {
        namespace: 'MyEditor',
        editorState: note.content,
        editable: !note.isTrash,
        theme,
        onError,

    };

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <AutoSavePlugin />
            <ToolbarPlugin  />
            <RichTextPlugin
                contentEditable={<ContentEditable className='flex-grow-1 p-4 editor overflow-y-auto border-start border-2 rounded shadow'  style={{backgroundColor: 'white'}} />}
                placeholder={<div className='position-absolute top-0 p-2 pe-none text-muted' style={{marginTop:'5.25rem', marginLeft:'1.1rem'}}>Enter some text...</div>}
                ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <EditorRefPlugin editorRef={editorRef}/>
        </LexicalComposer>
    )
}

export default Editor;

