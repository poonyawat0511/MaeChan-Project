"use client";
import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import BlurModal from "@/components/modals/BlurModal";
import { Button } from "@heroui/button";

interface SignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (file: File) => void;
  title?: string;
}

export default function SignatureModal({ isOpen, onClose, onSave, title }: SignatureModalProps) {
  const sigCanvas = useRef<SignatureCanvas>(null);

  const handleSave = async () => {
    if (!sigCanvas.current) return;
    const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");

    const response = await fetch(dataURL);
    const blob = await response.blob();

    const file = new File([blob], "signature.png", { type: "image/png" });
    onSave(file);
    onClose();


    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "signature.png";
    link.click();
    URL.revokeObjectURL(url);
  };


  const handleClear = () => {
    sigCanvas.current?.clear();
  };

  return (
    <BlurModal isOpen={isOpen} onClose={onClose} title={title || "เซ็นลายเซ็น"}>
      <div className="flex flex-col items-center space-y-4">
        <SignatureCanvas
          penColor="black"
          canvasProps={{ width: 800, height: 400, className: "border border-gray-300 rounded-md" }}
          ref={sigCanvas}
        />
        <div className="flex gap-2">
          <Button onPress={handleClear} className="bg-yellow-400 px-3 py-1 rounded text-white">ล้าง</Button>
          <Button onPress={handleSave} className="bg-blue-500 px-3 py-1 rounded text-white">บันทึก</Button>
        </div>
      </div>
    </BlurModal>
  );
}
