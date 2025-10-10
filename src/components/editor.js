import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { lineNumbers } from "@codemirror/view";
import { closeBrackets, closeBracketsKeymap } from "@codemirror/autocomplete";
import { keymap } from "@codemirror/view";
import * as themes from "@uiw/codemirror-themes-all";

const Editor = () => {
  return (
    <CodeMirror
      value="// Start coding..."
      height="500px"
      extensions={[
        javascript(),
        lineNumbers(),
        closeBrackets(),
        keymap.of(closeBracketsKeymap),
      ]}
      theme={themes.dracula}
    />
  );
};

export default Editor;
