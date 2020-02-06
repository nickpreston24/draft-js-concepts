import { useState } from 'react'
import { EditorState, Editor } from 'draft-js'
import { addStyles, addLogging } from './decorations'

const EntityEditor = props => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const handlePastedText = (text, styles, editorState) => {
        setState({
            editorState: removeEditorStyles(text, editorState),
        });
    };

    return (
        <>
            <Editor
                editorState={editorState}
                onChange={setEditorState}
            />
        </>
    )
};

export const Entity = addLogging(addStyles(EntityEditor))
// export const Entity = EntityEditor