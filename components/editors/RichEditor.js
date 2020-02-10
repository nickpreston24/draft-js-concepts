import { Editor, EditorState, RichUtils, convertToRaw } from "draft-js";
import { useState } from "react";
import pallete from "../../pallete.json";
import { humanize } from "./humanize";
import { PrimaryButton } from "./PrimaryButton";
import { SubmitButton } from "./SubmitButton";

export const Elite = () => {
  //TODO: Move to theme.js
  const styles = {
    root: {
      border: "2px solid" + pallete.primary.blue,
      backgroundColor: pallete.primary.white,
      fontFamily: "'Helvetica', sans-serif",
      borderRadius: "40px",
      padding: 20
    },
    editor: {
      backgroundColor: pallete.secondary.eggshell,
      border: "2px solid " + pallete.secondary.orange,
      overflowY: "auto",
      borderRadius: "25px",
      cursor: "text",
      height: "100%",
      maxHeight: "200px",
      padding: 10
    },
    headers: {
      color: pallete.primary.teal
    },
    button: {
      backgroundColor: pallete.primary.white,
      color: pallete.primary.blue,
      border: "1 px solid" + pallete.primary.blue,

      margin: "0 0.3em 0.3em 0",
      textAlign: "center",
      borderRadius: ".25em",
      fontWeight: "400",
      textDecoration: "none",
      fontFamily: "'firacode', sans-serif",
      transition: "all 0.2s"
    },
    submitButton: {
      color: pallete.secondary.eggshell,
      backgroundColor: pallete.primary.teal,
      display: "inline-block",
      padding: ".3em .3em .3em .3em",
      margin: ".3em .3em .3em .3em",
      textAlign: "center"
    }
  };

  // console.log('props: ', props);
  // const buttons = Object.values(props.alerts);
  // console.log('buttons: ', buttons);

  const { root, editor, headers } = styles;

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleKeyCommand = (command, state) => {
    const nextState = RichUtils.handleKeyCommand(state, command);

    if (nextState) {
      onChange(nextState);
      return "handled";
    }

    return "not-handled";
  };

  const toggleBlockType = type => {
    onChange(RichUtils.toggleBlockType(editorState, type));
  };

  const toggleInlineStyle = type => {
    onChange(RichUtils.toggleInlineStyle(editorState, type));
  };

  // TODO: Unsure what to do, should I plug it in somewhere?
  // const handlePastedText = (text, styles, editorState) => {
  //     setEditorState({
  //         editorState: removeEditorStyles(text, editorState),
  //     });
  // };

  const clear = () => setEditorState(EditorState.createEmpty());

  const onChange = nextstate => {
    // console.log('Next state: ', nextstate.toJS()) //intercept?
    let text = humanize(nextstate);
    console.log("Current Text: ", text);

    setEditorState(nextstate);
  };

  const logState = () =>
    console.log("Current state (onFocus):", editorState.toJS());

  return (
    <div className="RichEditor-root" style={root}>
      <h2 style={headers}>I'm rich!!</h2>

      <BlockStyleControls
        editorState={editorState}
        onToggle={toggleBlockType}
      />

      <InlineStyleControls
        editorState={editorState}
        onToggle={toggleInlineStyle}
      />

      {/* Universal controls */}
      <PrimaryButton onClick={clear}>CE</PrimaryButton>

      <div style={editor}>
        <Editor
          blockStyleFn={getBlockStyle}
          onFocus={logState}
          handleKeyCommand={handleKeyCommand}
          editorState={editorState}
          onChange={onChange}
        />
      </div>
      <SubmitButton onClick={logState}>Publish to TPOT</SubmitButton>
      <div>{JSON.stringify(convertToRaw(editorState.getCurrentContent()))}</div>
    </div>
  );
};

// // Custom overrides for "code" style.
// const styleMap = {
//   CODE: {
//     backgroundColor: "rgba(0, 0, 0, 0.05)",
//     fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
//     fontSize: 16,
//     padding: 2
//   }
// };

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: '"', style: "blockquote" },
  { label: "*-", style: "unordered-list-item" },
  { label: "1..3", style: "ordered-list-item" },

  // TODO: Find a tutorial for this specific use case:
  { label: "Strikethrough", style: "strikethrough" }

  // { label: "Code Block", style: "code-block" }
];

const getBlockStyle = block => {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
};

// const StyleButton = props => {
//   const onToggle = event => {
//     event.preventDefault();
//     props.onToggle(props.style);
//   };

//   let className = "RichEditor-styleButton";

//   if (props.active) {
//     className += " RichEditor-activeButton";
//   }

//   return (
//     <span className={className} onMouseDown={onToggle}>
//       {props.label}
//     </span>
//   );
// };

const BlockStyleControls = props => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map(type => (
        <PrimaryButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

var INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" }
];

const InlineStyleControls = props => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type => (
        <PrimaryButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};
