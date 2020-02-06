const styles = {
    root: {
        fontFamily: '\'Helvetica\', sans-serif',
        padding: 20,
        width: 600,
    },
    editor: {
        border: '2px solid #1cf',
        cursor: 'text',
        minHeight: 80,
        padding: 10,
        color: '#faa'
    },
    button: {
        marginTop: 10,
        textAlign: 'center',
    },
};

export const addStyles = Editor => props => {
    const { editor, root } = styles;
    return (
        <div style={root}>
            <div style={editor}>
                <Editor {...props} />
            </div>
        </div>
    )
}

export const addLogging = Editor => props => {

    const logState = () => { 
        console.log("You clicked logState()", props);
        // console.log(Editor.editorState.toJS()) 
    }
    const button = styles.button
    return (
        <div>
            <Editor props={props} />
            <input
                onClick={logState}
                style={button}
                type="button"
                value="Log State"
            />
        </div>
    )
}

