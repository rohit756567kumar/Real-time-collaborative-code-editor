import React, { useEffect, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { lineNumbers } from "@codemirror/view";
import { closeBrackets, closeBracketsKeymap } from "@codemirror/autocomplete";
import { keymap } from "@codemirror/view";
import * as themes from "@uiw/codemirror-themes-all";
import ACTIONS from "../Action";

const Editor = ({
  socketRef,
  roomId,
  onCodeChange,
  initialCode = "//Start coding...",
}) => {
  const editorRef = useRef(null); // Send local changes

  const handleCodeChange = (value) => {
    if (socketRef.current) {
      console.log("✉️ Emitting CODE_CHANGE");
      socketRef.current.emit(ACTIONS.CODE_CHANGE, { roomId, code: value });
    }
    onCodeChange(value); // Call parent's handler on local change [web:1]
  }; // Listen for remote changes

  useEffect(() => {
    if (!socketRef.current) return;

    const handleRemoteChange = ({ code }) => {
      const view = editorRef.current?.view;
      if (!view) return;

      const currentCode = view.state.doc.toString();
      if (code !== currentCode) {
        view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: code },
        });
      }
      onCodeChange(code); // Call parent's handler on remote change [web:1]
    };

    socketRef.current.on(ACTIONS.CODE_CHANGE, handleRemoteChange); // Clean up all CODE_CHANGE listeners on unmount

    return () => {
      if (socketRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        socketRef.current.off(ACTIONS.CODE_CHANGE); // Removes all listeners for this event [web:1]
      }
    };
  }, [socketRef, onCodeChange]);

  return (
    <CodeMirror
      ref={editorRef}
      value={initialCode}
      height="100vh"
      extensions={[
        javascript(),
        lineNumbers(),
        closeBrackets(),
        keymap.of(closeBracketsKeymap),
      ]}
      theme={themes.dracula}
      onChange={handleCodeChange}
    />
  );
};

export default Editor;
