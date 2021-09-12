import CodeEditor from "../Components/CodeEditor";
import PDFViewer from "../Components/PDFViewer";
import MenuBar from "../Components/MenuBar";
import { useState, useEffect } from "react";

export default function Generator() {
  const [code, setCode] = useState(
    "<html>\n  <head>\n  </head>\n  <body>\n\n  </body>\n</html>"
  );
  const [css, setCss] = useState<string>("h1 {\n\n}");
  const [pdfUrl, setPdfUrl] = useState<string | undefined>();
  const [CSS, setCSS] = useState(false);

  function onToggleClick() {
    setCSS(!CSS);
  }

  function onCodeChange(newValue: string) {
    setCode(newValue);
  }

  function onCssChange(newValue: string) {
    setCss(newValue);
  }

  const fetchPdf = () => {
    fetch(process.env.REACT_APP_API_URL + "/pdf/generate/", {
      method: "POST",
      body: JSON.stringify({
        text: code,
        css: css,
      }),
    })
      .then((r) => r.blob())
      .then(window.URL.createObjectURL)
      .then(setPdfUrl);
  };

  useEffect(() => {
    fetchPdf();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto h-screen p-8">
      <div className="pb-8">
        <MenuBar CSS={CSS} onToggleClick={onToggleClick} fetchPdf={fetchPdf} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-24">
        <CodeEditor
          CSS={CSS}
          code={code}
          onCodeChange={onCodeChange}
          css={css}
          onCssChange={onCssChange}
        />
        <PDFViewer pdfUrl={pdfUrl} />
      </div>
    </div>
  );
}
