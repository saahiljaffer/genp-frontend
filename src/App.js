import "./App.css";
import React, { useState } from "react";
// import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import samplePdf from "./sample.pdf";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-monokai";

import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Button(props) {
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
  const [code, setCode] = useState("");
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdf, setPdf] = useState(samplePdf);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function onChange(newValue) {
    setCode(newValue);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <div className="bg-gray-200 flex">
      <div className="container mx-auto p-4">
        <AceEditor
          placeholder="Enter code here..."
          mode="html"
          theme="monokai"
          name="blah2"
          onChange={onChange}
          fontSize={14}
          showPrintMargin={true}
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
        <Button
          onClick={() => {
            fetch(
              "https://django-pdf-generator.herokuapp.com/pdf/generate/pdf/",
              {
                method: "POST",
                body: JSON.stringify({
                  text: code,
                }),
              }
            )
              .then((r) => r.blob())
              .then(setPdf);
          }}
        >
          Generate
        </Button>
      </div>
      <div className="container mx-auto px-4">
        <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
        <div>
          <p>
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </p>
          <Button disabled={pageNumber <= 1} onClick={previousPage}>
            Previous
          </Button>
          <Button disabled={pageNumber >= numPages} onClick={nextPage}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
