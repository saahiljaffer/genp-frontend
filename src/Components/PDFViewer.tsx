export default function PDFViewer({ pdfUrl }: { pdfUrl: string | undefined }) {
  return (
    <iframe
      src={pdfUrl}
      className="h-full w-full"
      style={{ height: "calc(100vh - 250px)" }}
    ></iframe>
  );
}
