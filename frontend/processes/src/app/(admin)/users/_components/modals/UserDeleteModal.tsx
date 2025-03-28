"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";

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
    <Modal isOpen={isOpen} onClose={onClose} backdrop="blur">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="text-lg font-semibold">
              ยืนยันการลบผู้ใช้
            </ModalHeader>
            <ModalBody>
              <p>
                คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้รายนี้ การกระทำนี้ไม่สามารถย้อนกลับได้
              </p>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" color="danger" onPress={onClose}>
                ยกเลิก
              </Button>
              <Button color="primary" onPress={onConfirm}>
                ยืนยัน
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
