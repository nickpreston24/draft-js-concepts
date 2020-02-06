import { Editor, EditorState, RichUtils, convertToRaw, convertFromHTML } from 'draft-js';
import { useState } from 'react'

export const humanize = (editorState) => {

    const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
    const mappedBlocks = blocks.map(block => (!block.text.trim() && "\n") || block.text)

    let text = "";
    for (let i = 0; i < mappedBlocks.length; i++) {
        const block = mappedBlocks[i];

        // handle last block
        if (i === mappedBlocks.length - 1) {
            text += block;
        } else {
            // otherwise we join with \n, except if the block is already a \n
            if (block === "\n") text += block;
            else text += block + "\n";
        }
    }

    return text;
}


export const Elite = (props) => {

    const styles = {
        root: {
            fontFamily: '\'Helvetica\', sans-serif',
            padding: 20,
            width: 600,
        },
        editor: {
            border: '2px solid #c7c',
            cursor: 'text',
            minHeight: 80,
            padding: 10,
        },
        button: {
            marginTop: 10,
            marginLeft: 2,
            marginRight: 2,
            textAlign: 'center',
        },
    };

    // console.log('props: ', props);
    // const buttons = Object.values(props.alerts);
    // console.log('buttons: ', buttons);


    const { root, editor, button } = styles;

    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const handleKeyCommand = (command, state) => {
        const nextState = RichUtils.handleKeyCommand(state, command);

        if (nextState) {
            onChange(nextState);
            return 'handled';
        }

        return 'not-handled';
    }

    // TODO: Unsure what to do, should I plug it in somewhere?
    // const handlePastedText = (text, styles, editorState) => {
    //     setEditorState({
    //         editorState: removeEditorStyles(text, editorState),
    //     });
    // };

    const boldify = () =>
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));

    const italicize = () =>
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'))

    const underline = () =>
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'))

    // const strikethrough = () => 
    //     setEditorState(RichUtils.toggleLink())

    const clear = () =>
        setEditorState(EditorState.createEmpty())


    const onChange = (nextstate) => {
        // console.log('Next state: ', nextstate.toJS()) //intercept?
        let text = humanize(nextstate)
        console.log('Current Text: ', text);

        setEditorState(nextstate)
    }

    const logState = () => console.log('Current state (onFocus):', editorState.toJS())
    
    return (
        <div style={root}>
            <h2>I'm rich!!</h2>
            <button style={button} onClick={boldify}><b>B</b></button>
            <button style={button} onClick={italicize}><i>i</i></button>
            <button style={button} onClick={underline}><u>U</u></button>
            <button style={button} onClick={clear}>CLR</button>
            <button onClick={logState}>Log</button>
            <div style={editor}>
                <Editor                    
                    onFocus={logState}
                    handleKeyCommand={handleKeyCommand}
                    editorState={editorState}
                    onChange={onChange}
                />
            </div>
        </div>)
}