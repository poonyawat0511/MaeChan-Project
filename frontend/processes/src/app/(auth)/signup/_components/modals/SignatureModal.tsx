"use client";
import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import BlurModal from "@/components/modals/BlurModal";
import { ArrowDownCircleIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

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
        <div className="flex justify-between gap-4">
          <motion.button
            onClick={handleClear}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="px-3 py-1 rounded-xl text-blue-500 text-xs border border-blue-500"
          >
            <div className="flex items-center gap-1">
              <ArrowUturnLeftIcon className="h-4 w-4" />
              ล้าง
            </div>
          </motion.button>

          <motion.button
            onClick={handleSave}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="px-3 py-1 rounded-xl text-white text-xs bg-blue-600 hover:bg-blue-700"
          >
            <div className="flex items-center gap-1">
              <ArrowDownCircleIcon className="h-4 w-4" />
              บันทึก
            </div>
          </motion.button>

        </div>
      </div>
    </BlurModal>
  );
}
