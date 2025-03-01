import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Form,
  Input,
} from "@heroui/react";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  onSubmit: (formData: { time: string }) => void;
}

const TimeFormModal: React.FC<FormModalProps> = ({
  isOpen,
  onClose,
  title = "Create Item",
  onSubmit,
}) => {
  const [formData, setFormData] = useState({ time: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.time.trim()) return;
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
      <ModalContent className="max-w-4xl w-full">
        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            {/* Name Input */}
            <Input
              isRequired
              errorMessage={({ validationDetails }) =>
                validationDetails.valueMissing
                  ? "Please enter a name"
                  : undefined
              }
              label="Time"
              labelPlacement="outside"
              name="time"
              placeholder="Enter name"
              type="text"
              value={formData.time}
              onChange={handleChange}
            />

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-4">
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Confirm
              </Button>
            </div>
          </Form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TimeFormModal;
