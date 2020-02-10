import { useState, Component } from "react";
import { Editor, EditorState, Modifier, CompositeDecorator } from "draft-js";

/**
 * Utils
 */

const getTriggerRange = trigger => {
  const selection = window.getSelection();
  if (selection.rangeCount === 0) return null;

  const range = selection.getRangeAt(0);
  const text = range.startContainer.textContent.substring(0, range.startOffset);
  console.log(`> ${text}`);

  if (/s+$/.test(text)) return null;

  const index = text.lastIndexOf(trigger);
  if (index === -1) return null;

  return {
    text: text.substring(index),
    start: index,
    end: range.startOffset
  };
};

const getInsertRange = (autocompleteState, editorState) => {
  const currentSelectionState = editorState.getSelection();
  const end = currentSelectionState.getAnchorOffset();
  const anchorKey = currentSelectionState.getAnchorKey();
  const currentContent = editorState.getCurrentContent();
  const currentBlock = currentContent.getBlockForKey(anchorKey);
  const blockText = currentBlock.getText();
  const start = blockText.substring(0, end).lastIndexOf("#");

  return {
    start,
    end
  };
};

/**
 * Modifiers
 */
const addHashtag = (editorState, autoCompleteState, hashtag) => {
  // Get The range of text we want to replace:
  const { start, end } = getInsertRange(autoCompleteState, editorState);

  // Create a selection from the range:
  const currentSelectionState = editorState.getSelection();
  const selection = currentSelectionState.merge({
    anchorOffset: start,
    focusOffset: end
  });

  // Create entity that targets selection.  Can store any data in the object for later.
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(
    "HASHTAG",
    "IMMUTABLE",
    {
      hashtag
    }
  );

  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

  // Create the new content using Draft's Modifier utils
  // Selection is replaced with the hashtag (and annotated with entity metadata):

  let newContentState = Modifier.replaceText(
    contentStateWithEntity,
    selection,
    `#${hashtag}`,
    null,
    entityKey
  );

  // Return a new editor state,
  // forcing the selection to be after the newly inserted content:

  const newEditorState = EditorState.push(
    editorState,
    newContentState,
    `insert-hashtag`
  );

  return EditorState.forceSelection(
    newEditorState,
    newContentState.getSelectionAfter()
  );
};

const styles = {
  app: {
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    padding: "40px"
  },
  editor: {
    border: "1px solid black",
    width: "400px",
    height: "200px",
    padding: "20px"
  }
  //   suggestionover {
  //     cursor: pointer;
  //     background: #eee;
  //   }
};

/**
 * SAMPLE
 */

export class Hashtags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(
        new CompositeDecorator([
          {
            strategy: findHashtagEntities,
            component: Hashtag
          }
        ])
      ),
      autocompleteState: null
    };
  }

  focus() {
    this.editor.focus();
  }

  onChange(editorState) {
    this.setState({ editorState }, () => {
      const triggerRange = getTriggerRange("#");

      if (!triggerRange) {
        this.setState({ autocompleteState: null });
        return;
      }

      this.setState({
        autocompleteState: {
          searchText: triggerRange.text.slice(1, triggerRange.text.length),
          selectedIndex: 0
        }
      });
    });
  }

  renderSuggestion(text) {
    const { editorState, autocompleteState } = this.state;

    this.onChange(addHashTag(editorState, autocompleteState, text));

    this.setState({ autocompleteState: null });
  }

  render() {
    const { autocompleteState, editorState } = this.state;
    return (
      <div className="editor" onClick={this.focus.bind(this)}>
        <Editor
          ref={node => (this.editor = node)}
          editorState={editorState}
          onChange={this.onChange.bind(this)}
        />
        <Suggestions
          autocompleteState={autocompleteState}
          renderSuggestion={text => this.renderSuggestion(text)}
        />
      </div>
    );
  }
}

/**
 * MINE
 */

// export const Hashtags = props => {

//     // const editor = React.createRef();
//     // console.log('what is a ref?', editor);

//     const [editorState, setEditorState] = useState(
//         EditorState.createEmpty(
//             new CompositeDecorator([{
//                 strategy: findHashtagEntities,
//                 component: Hashtag,
//             }])
//         )
//     )

//     const [autoCompleteState, setAutoCompleteState] = useState(null);

//     const onChange = (editorState) => {

//         // Always set the current editor state
//         setEditorState(editorState)

//         const triggerRange = getTriggerRange('#')
//         console.log('trigger range:', triggerRange);

//         if (!triggerRange) {
//             setAutoCompleteState(null)
//             return
//         }

//         setAutoCompleteState({
//             searchText: triggerRange.text.slice(1, triggerRange.text.length)
//         })
//     }

//     const renderSuggestion = (text) => {
//         console.log('render suggestion: ', text);
//         onChange(addHashtag(editorState, autoCompleteState, text))
//         setAutoCompleteState(null);
//     }

//     // How would I replace 'this'?
//     // const focus  = ()=>{
//     //     this.editor.focus();
//     // }

//     return (
//         <>
//             <Editor
//                 // ref={node => editor = node}
//                 editorState={editorState}
//                 onChange={onChange}
//                 placeholder="Start typing here"
//             />
//             <Suggestions
//                 autoCompleteState={autoCompleteState}
//                 renderSuggestion={(text) => renderSuggestion(text)}
//             />
//         </>
//     )
// }

const HASHTAGS = [
  "cooking",
  "kravmaga",
  "MAGA",
  "kitties",
  "whoami",
  "coffee",
  "csharp",
  "linux",
  "Manjaro"
];

/**
 * Decorators
 */
const Hashtag = ({ children }) => {
  return <span style={{ background: "lightBlue" }}>{children}</span>;
};

const findHashtagEntities = (contentState, contentBlock, callback) => {
  console.log("content state: ", contentState);

  console.log("contentblock ", contentBlock);
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "HASHTAG"
    );
  }, callback);
};

/**
 * Components
 */
class Suggestions extends React.Component {
  render() {
    const { autoCompleteState } = this.props;
    if (!autoCompleteState) return null;
    const { searchText } = autoCompleteState;

    return (
      <div>
        <ul>
          {HASHTAGS.filter(
            htag => htag.substring(0, searchText.length) === searchText
          ).map(result => (
            <li key={result}>{result}</li>
          ))}
        </ul>
      </div>
    );
  }
}
