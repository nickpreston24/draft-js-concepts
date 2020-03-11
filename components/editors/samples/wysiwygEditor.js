import { useState } from 'react'
import { Editor } from 'react-draft-wysiwyg';

const WYSIWYG = () => {

    const [editorState, setEditorState] = useState(initialState);

    return (
        <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={this.onEditorStateChange}
        />)
}

export default WYSIWYG;