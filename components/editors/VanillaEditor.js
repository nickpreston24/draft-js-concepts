import React, { useState } from "react";
import { Editor, EditorState } from "draft-js";

/**
 * The most basic Editor
 */
export const Vanilla = props => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    return (
        <>
            <i>I'm Plain Jane</i>
            <Editor editorState={editorState} onChange={setEditorState} />
        </>
    )
};

/**
 * The most basic Editor (hooks-based)
 */
export const Chocolate = props => {

    const [editorState, setEditorState] = useState(
        EditorState.createEmpty(),
    )

    const styles = {
        root: {
            fontFamily: '\'Helvetica\', sans-serif',
            padding: 20,
            width: 600,
        },
        editor: {
            border: '1px solid #ccc',
            cursor: 'text',
            minHeight: 80,
            padding: 10,
        },
        button: {
            marginTop: 10,
            textAlign: 'center',
        },
    };


    const { root, editor, button } = styles;

    // const setDomEditorRef = ref => domEditor = ref;
    // const focus = () => domEditor.focus()
    const logState = () => console.log(editorState.toJS());

    return (
        <>
            <div style={root}>
                <h2>I completely cocoa!</h2>
                <div style={editor}
                // onClick={focus}
                >
                    <Editor
                        editorState={editorState}
                        onChange={setEditorState}
                        placeholder="Enter some text..."
                    // ref={setDomEditorRef}
                    />
                </div>
                <input
                    onClick={logState}
                    style={button}
                    type="button"
                    value="Log State"
                />
            </div>
        </>)
}
