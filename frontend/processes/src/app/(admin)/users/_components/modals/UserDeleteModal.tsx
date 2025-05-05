"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { motion } from "framer-motion";
import { ExclamationTriangleIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface UserDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function UserDeleteModal({
  isOpen,
  onClose,
  onConfirm,
}: UserDeleteModalProps) {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      backdrop="blur"
      classNames={{
        base: "bg-white rounded-2xl shadow-xl border-2 border-red-100",
        header: "border-b border-red-100",
        body: "py-6",
        footer: "border-t border-red-100"
      }}
      motionProps={{
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 },
        transition: { duration: 0.3 }
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="text-xl font-bold flex gap-2 items-center text-red-700">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
              ยืนยันการลบผู้ใช้
            </ModalHeader>
            <ModalBody>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-4"
              >
                <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                  <p className="text-lg text-gray-700">
                    คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้รายนี้? 
                  </p>
                  <p className="text-red-600 font-medium mt-2">
                    ⚠️ การกระทำนี้ไม่สามารถย้อนกลับได้ ข้อมูลทั้งหมดของผู้ใช้รายนี้จะถูกลบถาวร
              </p>
                </div>
              </motion.div>
            </ModalBody>
            <ModalFooter>
              <Button 
                variant="flat" 
                color="default" 
                onPress={onClose}
                startContent={<XMarkIcon className="h-5 w-5" />}
                className="text-md font-medium"
                size="lg"
              >
                ยกเลิก
              </Button>
              <Button 
                color="danger" 
                onPress={onConfirm}
                startContent={<TrashIcon className="h-5 w-5" />}
                className="text-md font-medium bg-gradient-to-r from-red-500 to-red-700"
                size="lg"
              >
                ยืนยันการลบ
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
