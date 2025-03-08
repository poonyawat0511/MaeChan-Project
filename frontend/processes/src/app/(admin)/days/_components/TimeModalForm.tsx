import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Form,
  TimeInput,
} from "@heroui/react";
import { Time } from "@internationalized/date";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  onSubmit: (formData: { time: string }) => void;
}

const TimeFormModal: React.FC<FormModalProps> = ({
  isOpen,
  onClose,
  title = "เลือกเวลา",
  onSubmit,
}) => {
  // State to store Time object
  const [time, setTime] = useState(new Time(0, 0)); // Default to 12:00

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!time) return;

    // Convert Time object to a string format HH:mm
    const formattedTime = `${String(time.hour).padStart(2, "0")}:${String(
      time.minute
    ).padStart(2, "0")}`;

    onSubmit({ time: formattedTime });
    onClose();
  };

  return (
    <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
      <ModalContent className="max-w-4xl w-full">
        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            {/* Time Input */}
            <TimeInput
              isRequired
              label="เลือกเวลา"
              labelPlacement="outside"
              value={time}
              onChange={(value) => value && setTime(value)}
              hourCycle={24} // Ensure 24-hour format
            />

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-4">
              <Button color="danger" variant="light" onPress={onClose}>
                ยกเลิก
              </Button>
              <Button type="submit" color="primary">
                ยืนยัน
              </Button>
            </div>
          </Form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TimeFormModal;
