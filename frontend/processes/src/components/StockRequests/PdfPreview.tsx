interface PdfPreviewProps {
  pdfUrl: string;
}

export default function PdfPreview({ pdfUrl }: PdfPreviewProps) {
  return (
    <div className="flex h-screen border-none rounded-lg">
      <iframe className="w-full h-full border-none rounded-xl" src={pdfUrl} />
    </div>
  );
}
