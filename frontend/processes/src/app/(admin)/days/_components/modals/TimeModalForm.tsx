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
import { ClockIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Time } from "@internationalized/date";
import { motion } from "framer-motion";

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
  const [time, setTime] = useState(new Time(8, 0)); // Default to 08:00

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
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onClose={onClose}
      classNames={{
        backdrop: "bg-black/60",
        base: "border-0 shadow-xl rounded-2xl",
        wrapper: "z-50"
      }}
      size="2xl"
      motionProps={{
        variants: {
          enter: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
              duration: 0.3,
              ease: "easeOut"
            }
          },
          exit: {
            opacity: 0,
            scale: 0.95,
            y: 20,
            transition: {
              duration: 0.2,
              ease: "easeIn"
            }
          }
        },
        initial: { opacity: 0, scale: 0.95, y: 20 }
      }}
    >
      <ModalContent className="max-w-4xl w-full overflow-hidden">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 py-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <ClockIcon className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-blue-800">{title}</h2>
              </div>
            </ModalHeader>
            <ModalBody className="p-6 bg-gradient-to-b from-white to-gray-50">
              <Form onSubmit={handleSubmit} className="flex items-center">
                <motion.div
                  className="mb-8 p-6 bg-white rounded-xl border border-gray-200 shadow-sm w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <TimeInput
                    isRequired
                    label="เลือกเวลาสำหรับการแจ้งเตือน"
                    labelPlacement="outside"
                    value={time}
                    onChange={(value) => value && setTime(value)}
                    hourCycle={24}
                    size="lg"
                    classNames={{
                      base: "w-full",
                      label: "text-lg font-medium mb-3 text-gray-700",
                      input: "text-sm border-1 focus:border-blue-500 rounded-lg p-3 h-10",
                      inputWrapper: "bg-white hover:bg-blue-50 transition-colors"
                    }}
                    description={
                      <div className="text-gray-600 mt-2 flex items-start gap-2">
                        <div className="text-blue-500 mt-0.5 flex">
                          <ClockIcon className="h-4 w-4" />
                          <span>กำหนดเวลาที่ต้องการให้ระบบแจ้งเตือนในแต่ละวัน</span>
                        </div>
                      </div>
                    }
                  />
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  className="flex justify-end gap-4 mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      color="danger"
                      variant="flat"
                      onPress={onClose}
                      size="lg"
                      className="px-6 font-medium text-base"
                      startContent={<XMarkIcon className="h-5 w-5" />}
                    >
                      ยกเลิก
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      type="submit"
                      color="primary"
                      size="lg"
                      className="px-8 font-medium text-base bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md"
                      startContent={<CheckIcon className="h-5 w-5" />}
                    >
                      ยืนยันเวลา
                    </Button>
                  </motion.div>
                </motion.div>
              </Form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default TimeFormModal;
