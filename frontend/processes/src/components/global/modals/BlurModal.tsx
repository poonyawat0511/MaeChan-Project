import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";

interface BlurModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  onAction?: () => void;
  actionLabel?: string;
}

const BlurModal: React.FC<BlurModalProps> = ({
  isOpen,
  onClose,
  title = "",
  children,
  onAction,
  actionLabel = "Action",
}) => {
  return (
    <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
      <ModalContent className="max-w-4xl w-full">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody className="h-[80vh] overflow-auto">{children}</ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              {onAction && (
                <Button color="primary" onPress={onAction}>
                  {actionLabel}
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default BlurModal;
