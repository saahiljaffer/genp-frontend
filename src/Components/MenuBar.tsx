import React, { useEffect, useState } from "react";

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

export default function MenuBar({
  pageNumber,
  changePage,
  numPages,
  fetchPdf,
  pdf,
}: {
  pageNumber: number;
  changePage: (pageNum: number) => void;
  numPages: number;
  fetchPdf: () => void;
  pdf: Blob | undefined;
}) {
  const [pdfUrl, setPdfUrl] = useState<string | undefined>();

  useEffect(() => {
    if (pdf) {
      setPdfUrl(window.URL.createObjectURL(pdf));
    }
  }, [pdf]);

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <div className="flex place-content-center">
      <Button>
        <a download="file.pdf" href={pdfUrl}>
          Download
        </a>
      </Button>
      <Button onClick={fetchPdf}>Generate</Button>
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
  );
}
