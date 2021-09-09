import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-monokai";

export default function CodeEditor({
  onChange,
  code,
}: {
  onChange: (newValue: string) => void;
  code: string;
}) {
  return (
    <AceEditor
      style={{ height: "100%", width: "100%" }}
      placeholder="Enter code here..."
      mode="html"
      theme="monokai"
      name="blah2"
      onChange={onChange}
      fontSize={14}
      showPrintMargin={false}
      showGutter={true}
      highlightActiveLine={true}
      value={code}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
      }}
    />
  );
}
