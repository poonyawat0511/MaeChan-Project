interface PdfPreviewProps {
  pdfUrl: string;
}

export default function PdfPreview({ pdfUrl }: PdfPreviewProps) {
  return (
    <div className="w-full h-full">
      <iframe className="w-full h-full border-none rounded-xl" src={pdfUrl} />
    </div>
  );
}
