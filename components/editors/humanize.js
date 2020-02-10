import { convertToRaw } from "draft-js";
export const humanize = editorState => {
  const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
  const mappedBlocks = blocks.map(block => (!block.text.trim() && "\n") || block.text);
  let text = "";
  for (let i = 0; i < mappedBlocks.length; i++) {
    const block = mappedBlocks[i];
    // handle last block
    if (i === mappedBlocks.length - 1) {
      text += block;
    }
    else {
      // otherwise we join with \n, except if the block is already a \n
      if (block === "\n")
        text += block;
      else
        text += block + "\n";
    }
  }
  return text;
};
