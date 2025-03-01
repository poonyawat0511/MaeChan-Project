import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Form,
  Input,
  Switch,
} from "@heroui/react";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  onSubmit: (formData: { name: string; active: boolean }) => void;
  initialValues?: { name: string; active: boolean } | null;
}

const DayFormModal: React.FC<FormModalProps> = ({
  isOpen,
  onClose,
  title = "Create Item",
  onSubmit,
  initialValues = null,
}) => {
  const [formData, setFormData] = useState({ name: "", active: true });

  // Populate form when initialValues change
  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues);
    } else {
      setFormData({ name: "", active: true });
    }
  }, [initialValues]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle switch toggle
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, active: e.target.checked }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return; // Prevent empty names
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
                validationDetails.valueMissing ? "Please enter a name" : undefined
              }
              label="Name"
              labelPlacement="outside"
              name="name"
              placeholder="Enter name"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />

            {/* Active Switch */}
            <div className="mt-4 flex items-center justify-between gap-4">
              <span className="text-gray-700">Active</span>
              <Switch isSelected={formData.active} onChange={handleToggle} />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-4">
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button type="submit" color="primary">
                {initialValues ? "Update" : "Create"}
              </Button>
            </div>
          </Form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DayFormModal;
