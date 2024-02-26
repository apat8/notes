import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { faBold, faItalic, faRotateLeft, faRotateRight, faUnderline } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { 
    FORMAT_TEXT_COMMAND,
    REDO_COMMAND,
    UNDO_COMMAND,
    CAN_REDO_COMMAND,
    CAN_UNDO_COMMAND,
    $getSelection  } from 'lexical';
import { mergeRegister } from '@lexical/utils';

const ToolbarPlugin = () => {
    const [editor] = useLexicalComposerContext();
    const [canRedo, setCanRedo] = useState(false);
    const [canUndo, setCanUndo] = useState(false);
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);

    useEffect(() => {
        return mergeRegister(
            editor.registerUpdateListener(({editorState}) => {
                editorState.read(() => {
                    const selection = $getSelection();

                    setIsBold(selection.hasFormat('bold'));
                    setIsItalic(selection.hasFormat('italic'));
                    setIsUnderline(selection.hasFormat('underline'));
                })
            }),
            editor.registerCommand(CAN_REDO_COMMAND, 
                (payload) => {
                    setCanRedo(payload)
                    return false;
            }, 1),
            editor.registerCommand(CAN_UNDO_COMMAND, 
                (payload) => {
                    setCanUndo(payload)
                    return false;
            }, 1),
            
        )
    }, [editor])


    return (
        <div className='d-flex align-center bg-white p-2 rounded-pill mx-4 mb-3 shadow-sm toolbar ' style={{position:'sticky', top:'0'}} >
            <Button className='toolbar-item space' aria-label="Undo" disabled={!canUndo} onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)} >
                <FontAwesomeIcon className='icon' icon={faRotateLeft} />
            </Button>
            <Button className='toolbar-item space' aria-label="Redo" disabled={!canRedo} onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)} >
                <FontAwesomeIcon className='icon' icon={faRotateRight} />
            </Button>
            <div className="divider" />
            <Button className={`toolbar-item space ${isBold ? 'active' : ''}`} aria-label='Bold' onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')} >
                <FontAwesomeIcon className='icon' icon={faBold} />
            </Button>
            <Button className={`toolbar-item space ${isItalic ? 'active' : ''}`}  aria-label='Italics' onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')} >
                <FontAwesomeIcon className='icon' icon={faItalic} />
            </Button>
            {/* <div class="vr mx-3"></div> */}
            <Button className={`toolbar-item space ${isUnderline ? 'active' : ''}`} aria-label='Underline' onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')} >
                <FontAwesomeIcon className='icon' icon={faUnderline} />
            </Button>
        </div>
    )
}

export default ToolbarPlugin;