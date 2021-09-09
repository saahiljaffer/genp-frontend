import "./App.css";
import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-monokai";
import PDFViewer from "./Components/PDFViewer";

interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

function Button(props: ButtonProps) {
  if (props.disabled) {
    return (
      <button className="m-2 font-sans opacity-50 cursor-not-allowed font-medium py-2 px-4 border rounded bg-indigo-600 text-white border-indigo-500 hover:bg-indigo-700">
        {props.children}
      </button>
    );
  } else {
    return (
      <button
        className="m-2 font-sans font-medium py-2 px-4 border rounded bg-indigo-600 text-white border-indigo-500 hover:bg-indigo-700"
        onClick={props.onClick}
      >
        {props.children}
      </button>
    );
  }
}

function App() {
  const [code, setCode] = useState(
    "<html>\n<head>\n</head>\n<body>\n</body>\n</html>"
  );
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdf, setPdf] = useState<Blob>();
  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function onChange(newValue: string) {
    setCode(newValue);
  }

  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/pdf/generate/pdf/", {
      method: "POST",
      body: JSON.stringify({
        text: code,
      }),
    })
      .then((r) => r.blob())
      .then(setPdf);
  }, []);

  return (
    <div className="container mx-auto p-8 m-8 flex">
      <div className="w-full pr-4">
        <div className="flex place-content-center">
          <Button
            onClick={() => {
              fetch(process.env.REACT_APP_API_URL + "/pdf/generate/pdf/", {
                method: "POST",
                body: JSON.stringify({
                  text: code,
                }),
              })
                .then((r) => r.blob())
                .then(setPdf);
            }}
          >
            Generate
          </Button>
        </div>
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
      </div>
      <div>
        <div className="flex place-content-center">
          <Button disabled={pageNumber <= 1} onClick={previousPage}>
            Previous
          </Button>
          <Button disabled={true}>
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </Button>
          <Button disabled={pageNumber >= numPages} onClick={nextPage}>
            Next
          </Button>
        </div>
        <div className="container h-full bg-white mx-auto">
          <PDFViewer
            pdf={pdf}
            onDocumentLoadSuccess={onDocumentLoadSuccess}
            pageNumber={pageNumber}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
