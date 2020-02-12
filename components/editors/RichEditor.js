import { Editor, EditorState, RichUtils, convertToRaw, Modifier } from "draft-js";
import { useState, useRef } from "react";
import { stateToHTML } from 'draft-js-export-html';
import pallete from "../../pallete.json";
import { humanize } from "./humanize";
import { PrimaryButton } from "../buttons/PrimaryButton";
import { SubmitButton } from "../buttons/SubmitButton";

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
    controls: {
      fontFamily: '\'Helvetica\', sans-serif',
      fontSize: 14,
      marginBottom: 10,
      userSelect: 'none',
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

  const editorRef = useRef(null);

  const { root, editor, headers } = styles;

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const exportHtml = () => {

    const contentState = editorState.getCurrentContent()
    let html = stateToHTML(contentState);
    console.log(html);
    // console.log(stateToHTML(editorState.getCurrentContent()));
  }

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
    // let text = humanize(nextstate);
    // console.log("Current Text: ", text);

    setEditorState(nextstate);
  };

  // const focus = () => editorRef.current.focus()

  const logState = () => {
    console.log("Current state (onFocus):", editorState.toJS());
  };


  const toggleColor = (toggledColor) => {

    console.log('toggled color:', toggledColor);

    const selection = editorState.getSelection();

    console.log('selection: ', selection);

    const nextContentState = Object.keys(colorStyleMap)
      .reduce((contentState, color) => {
        return Modifier.removeInlineStyle(contentState, selection, color)
      }, editorState.getCurrentContent())

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    )

    const currentStyle = editorState.getCurrentInlineStyle();

    // Unset the style override for the current color:
    if (selection.isCollapsed()) {
      console.log('unset style.');
      nextEditorState = currentStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(state, color)
      }, nextEditorState)
    }

    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledColor)) {
      console.log('applied color!', currentStyle);
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledColor
      )
    }

    onChange(nextEditorState)
  }

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

      <ColorPicker
        editorState={editorState}
        onToggle={toggleColor}
      />

      {/* Universal controls */}
      <PrimaryButton onClick={clear}>CE</PrimaryButton>

      <div style={editor}>
        <Editor
          ref={editorRef}
          blockStyleFn={getBlockStyle}
          onFocus={logState}
          customStyleMap={colorStyleMap}
          handleKeyCommand={handleKeyCommand}
          editorState={editorState}
          onChange={onChange}
        />
      </div>

      <SubmitButton onClick={exportHtml}>Publish to TPOT</SubmitButton>

      <div>
        {JSON.stringify(convertToRaw(editorState.getCurrentContent()))}
      </div>

    </div>
  );
};


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
  // { label: "-S-", style: "STRIKETHROUGH" },
  // { label: "-S-", style: "line-through" }
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

const BlockStyleControls = props => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map(type => {
        return (
          <PrimaryButton
            key={type.label}
            active={type.style === blockType}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        )
      })}
    </div>
  );
};

const styleMap = {
  'STRIKETHROUGH': {
    textDecoration: 'line-through',
  },
};

const ColorPicker = props => {

  var currentStyle = props.editorState.getCurrentInlineStyle();
  // const styles = props.styles;

  return (
    <div>
      {COLORS.map(type =>
        <PrimaryButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />)
      }
    </div>
  )
}

var COLORS = [
  { label: 'Red', style: 'red' },
  { label: 'Orange', style: 'orange' },
  { label: 'Yellow', style: 'yellow' },
  { label: 'Green', style: 'green' },
  { label: 'Blue', style: 'blue' },
  { label: 'Indigo', style: 'indigo' },
  { label: 'Violet', style: 'violet' },
];

// This object provides the styling information for our custom color
// styles.
const colorStyleMap = {
  red: {
    color: 'rgba(255, 0, 0, 1.0)',
  },
  orange: {
    color: 'rgba(255, 127, 0, 1.0)',
  },
  yellow: {
    color: 'rgba(180, 180, 0, 1.0)',
  },
  green: {
    color: 'rgba(0, 180, 0, 1.0)',
  },
  blue: {
    color: 'rgba(0, 0, 255, 1.0)',
  },
  indigo: {
    color: 'rgba(75, 0, 130, 1.0)',
  },
  violet: {
    color: 'rgba(127, 0, 255, 1.0)',
  },
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
