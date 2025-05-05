"use client";

import { useState, ChangeEvent, useRef } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Image } from "@heroui/react";
import { useAlert } from "@/components/alerts/GlobalAlertProvider";
import { PencilSquareIcon, ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { axiosInstance } from "@/utils/api/api";

interface SignatureModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentSignature: string;
    userId: number;
    onUploaded: (newUrl: string) => void;
}

export default function SignatureModal({ isOpen, onClose, currentSignature, userId ,onUploaded }: SignatureModalProps) {
    const [imagePreview, setImagePreview] = useState<string | null>(currentSignature || null);
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { showAlert } = useAlert();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];

        if (selectedFile) {
            // Check file type
            if (!selectedFile.type.match('image.*')) {
                showAlert("กรุณาเลือกไฟล์รูปภาพเท่านั้น", "danger");
                return;
            }

            // Check file size (limit to 5MB)
            if (selectedFile.size > 5 * 1024 * 1024) {
                showAlert("ไฟล์มีขนาดใหญ่เกินไป (สูงสุด 5MB)", "danger");
                return;
            }

            setFile(selectedFile);

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            showAlert("กรุณาเลือกไฟล์ก่อนอัพโหลด", "warning");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('signature', file);
            formData.append('userId', userId.toString());

            const res = await axiosInstance.post('/user-hospital/' + userId + '/upload-signature', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const newSignatureUrl = res.data;
            onUploaded(newSignatureUrl + `?t=${Date.now()}`);
            showAlert("อัพโหลดลายเซ็นสำเร็จ", "success");
            onClose()

        } catch (error) {
            console.error("Error uploading signature:", error);
            showAlert("เกิดข้อผิดพลาดในการอัพโหลด", "danger");
        } finally {
            setLoading(false);
        }
    };

    const handleClearSelection = () => {
        setFile(null);
        setImagePreview(currentSignature || null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent className="max-w-md">
                <ModalHeader className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <PencilSquareIcon className="h-5 w-5 text-indigo-600" />
                        <span className="text-xl font-bold">อัพเดทลายเซ็น</span>
                    </div>
                    <p className="text-sm text-gray-500">อัพโหลดรูปภาพลายเซ็นของคุณ</p>
                </ModalHeader>

                <ModalBody>
                    <div className="space-y-6">
                        <div className="relative h-64 w-full border-2 border-dashed border-indigo-200 rounded-xl bg-indigo-50/50 flex items-center justify-center overflow-hidden">
                            {imagePreview ? (
                                <>
                                    <Image
                                        src={imagePreview}
                                        alt="ตัวอย่างลายเซ็น"
                                        className="max-h-full max-w-full object-contain p-4"
                                    />
                                    {file && (
                                        <button
                                            onClick={handleClearSelection}
                                            className="absolute top-2 right-2 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200 transition-colors"
                                            aria-label="Clear selection"
                                        >
                                            <XMarkIcon className="h-5 w-5" />
                                        </button>
                                    )}
                                </>
                            ) : (
                                <div className="text-center p-6">
                                    <ArrowUpTrayIcon className="h-12 w-12 text-indigo-300 mx-auto mb-3" />
                                    <p className="text-indigo-700 font-medium mb-1">คลิกเพื่ออัพโหลดลายเซ็น</p>
                                    <p className="text-gray-500 text-sm">
                                        สนับสนุนไฟล์ JPG, PNG หรือ GIF (ไม่เกิน 5MB)
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-center">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                            />
                            <Button
                                className="bg-indigo-600 text-white"
                                startContent={<ArrowUpTrayIcon className="h-5 w-5" />}
                                onPress={triggerFileInput}
                            >
                                เลือกไฟล์รูปภาพ
                            </Button>
                        </div>

                        <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                            <p className="font-medium mb-1 text-gray-700">คำแนะนำ:</p>
                            <ul className="list-disc list-inside space-y-1 text-gray-600">
                                <li>ควรใช้รูปภาพพื้นหลังโปร่งใส (PNG)</li>
                                <li>รูปภาพควรมีขนาดที่เหมาะสม ไม่เล็กหรือใหญ่เกินไป</li>
                                <li>ควรเป็นลายเซ็นที่ชัดเจนและอ่านง่าย</li>
                            </ul>
                        </div>
                    </div>
                </ModalBody>

                <ModalFooter>
                    <Button variant="flat" onPress={onClose} className="text-gray-700">
                        ยกเลิก
                    </Button>
                    <Button
                        className="bg-indigo-600 text-white"
                        onPress={handleUpload}
                        isLoading={loading}
                        isDisabled={!file || loading}
                    >
                        {loading ? "กำลังอัพโหลด..." : "อัพโหลดลายเซ็น"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
} 