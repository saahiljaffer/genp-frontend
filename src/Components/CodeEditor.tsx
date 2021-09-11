import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/theme-monokai";

export default function CodeEditor({
  code,
  onCodeChange,
  css,
  onCssChange,
  CSS,
}: {
  code: string;
  onCodeChange: (value: string) => void;
  css: string;
  onCssChange: (value: string) => void;
  CSS: boolean;
}) {
  return (
    <>
      <AceEditor
        style={{ height: "calc(100vh - 250px)", width: "100%" }}
        placeholder="Enter code here..."
        mode={CSS ? "css" : "html"}
        theme="monokai"
        name="blah2"
        onChange={CSS ? onCssChange : onCodeChange}
        fontSize={14}
        showPrintMargin={false}
        showGutter={true}
        highlightActiveLine={true}
        value={CSS ? css : code}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    </>
  );
}
