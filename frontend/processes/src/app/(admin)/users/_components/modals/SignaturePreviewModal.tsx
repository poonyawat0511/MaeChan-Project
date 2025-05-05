"use client";
import { Image, Button } from "@heroui/react";
import BlurModal from "@/components/modals/BlurModal";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownTrayIcon, XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface SignaturePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}

export default function SignaturePreviewModal({
  isOpen,
  onClose,
  imageUrl,
}: SignaturePreviewModalProps) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "signature.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <BlurModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="ลายเซ็นผู้ใช้"
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="flex flex-col gap-6 p-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="flex justify-center items-center bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border-2 border-gray-200 group relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Image
                src={imageUrl}
                alt="ลายเซ็น"
                className="w-auto max-h-[60vh] rounded-md shadow-md"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </BlurModal>
  );
}
