"use client";
import { Image } from "@heroui/react";
import BlurModal from "@/components/modals/BlurModal";

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
  return (
    <BlurModal isOpen={isOpen} onClose={onClose} title="ลายเซ็นผู้ใช้">
      <div className="flex justify-center items-center">
        <Image
          src={imageUrl}
          alt="ลายเซ็น"
          className="w-auto max-h-[60vh] border rounded shadow-lg"
        />
      </div>
    </BlurModal>
  );
}
