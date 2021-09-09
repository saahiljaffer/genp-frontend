import "./App.css";
import React, { useEffect, useState } from "react";
import CodeEditor from "./Components/CodeEditor";
import PDFViewer from "./Components/PDFViewer";
import MenuBar from "./Components/MenuBar";

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

  function onCodeChange(newValue: string) {
    setCode(newValue);
  }

  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function fetchPdf() {
    fetch(process.env.REACT_APP_API_URL + "/pdf/generate/pdf/", {
      method: "POST",
      body: JSON.stringify({
        text: code,
      }),
    })
      .then((r) => r.blob())
      .then(setPdf);
  }

  useEffect(() => {
    fetchPdf();
  }, []);

  return (
    <div className="container mx-auto h-screen p-8">
      <div className="pb-4">
        <MenuBar
          pageNumber={pageNumber}
          changePage={changePage}
          numPages={numPages}
          fetchPdf={fetchPdf}
        />
      </div>
      <div className="h-full w-full flex">
        <div className="h-full w-full pr-4 ">
          <CodeEditor code={code} onChange={onCodeChange} />
        </div>
        <div className="h-full bg-white mx-auto">
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
