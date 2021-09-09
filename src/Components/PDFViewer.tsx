import React from "react";
import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PDFViewer({
  pdf,
  onDocumentLoadSuccess,
  pageNumber,
}: {
  pdf: Blob | undefined;
  onDocumentLoadSuccess: ({ numPages }: { numPages: number }) => void;
  pageNumber: number;
}) {
  return (
    <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
      <Page pageNumber={pageNumber} />
    </Document>
  );
}
