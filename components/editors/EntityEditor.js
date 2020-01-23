import { useState } from 'react'
import { EditorState, Editor } from 'draft-js'
import { addStyles, addLogging } from './decorations'

const EntityEditor = props => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
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