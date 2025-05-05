import { useState } from "react";
import { Me } from "@/utils/types/me";
import { PencilSquareIcon, UserCircleIcon, EnvelopeIcon, IdentificationIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { Button, Card, CardBody, CardHeader, Image, Chip, Tooltip } from "@heroui/react";
import { motion } from "framer-motion";
import SignatureModal from "../modals/SignatureModal";


interface profileCardProps {
    me: Me | null;
}

export default function ProfileCard({ me }: profileCardProps) {

    if (!me) return null;

    const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
    const [signaturePath, setSignaturePath] = useState(me.signaturePath);
    return (
        <>
            <motion.div
                className="w-full max-w-4xl mx-auto"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <Card className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden border border-indigo-100">
                    <CardHeader className="flex flex-col md:flex-row justify-between items-center gap-4 p-6 bg-gradient-to-r from-indigo-50 to-purple-50">
                        <div className="flex items-center gap-4">
                            <div className="bg-indigo-100 p-2 rounded-full">
                                <UserCircleIcon className="h-6 w-6 text-indigo-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">ข้อมูลโปรไฟล์</h2>
                                <p className="text-sm text-gray-600">ข้อมูลส่วนตัวและลายเซ็นของคุณ</p>
                            </div>
                        </div>
                        <Chip className="bg-indigo-100 text-indigo-700 font-medium border-none" size="md">
                            {me.role}
                        </Chip>
                    </CardHeader>

                    <CardBody className="p-0">
                        <div className="flex flex-col-reverse md:flex-row">
                            {/* Left: Information Section */}
                            <div className="flex-1 p-6 md:p-8">
                                <div className="space-y-6">
                                    <div className="flex flex-col space-y-1">
                                        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mb-1">
                                            <IdentificationIcon className="h-4 w-4" />
                                            <span>ชื่อ-นามสกุล</span>
                                        </div>
                                        <p className="text-lg font-semibold text-gray-900 pl-6">
                                            {me.firstName} {me.lastName}
                                        </p>
                                    </div>

                                    <div className="flex flex-col space-y-1">
                                        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mb-1">
                                            <EnvelopeIcon className="h-4 w-4" />
                                            <span>อีเมล</span>
                                        </div>
                                        <p className="text-lg font-semibold text-gray-900 pl-6">
                                            {me.email}
                                        </p>
                                    </div>

                                    <div className="flex flex-col space-y-1">
                                        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mb-1">
                                            <UserCircleIcon className="h-4 w-4" />
                                            <span>ตำแหน่ง</span>
                                        </div>
                                        <Chip className="bg-indigo-100 text-indigo-700 font-medium border-none w-fit" size="md">
                                            {me.role}
                                        </Chip>
                                    </div>
                                </div>

                                <div className="mt-10">
                                    <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                                        <div className="flex items-center gap-2 mb-2">
                                            <ArrowPathIcon className="h-4 w-4 text-indigo-600" />
                                            <p className="text-sm font-medium text-indigo-700">คำแนะนำ</p>
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            ท่านสามารถแก้ไขลายเซ็นได้โดยการคลิกที่ปุ่ม "เปลี่ยนลายเซ็น" ทางด้านขวา
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Signature Section */}
                            <div className="w-full md:w-64 lg:w-80 bg-gradient-to-b from-indigo-50 to-white p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-l border-indigo-100">
                                <div className="text-center mb-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">ลายเซ็นของคุณ</h3>
                                    <p className="text-sm text-gray-500">ใช้สำหรับเอกสารในระบบ</p>
                                </div>

                                <div className="relative w-full h-48 rounded-xl overflow-hidden bg-white border border-indigo-100 shadow-md mb-4 flex items-center justify-center">
                                    {signaturePath ? (
                                        <Image
                                            src={signaturePath}
                                            alt="ลายเซ็น"
                                            className="w-full h-full object-contain p-4"
                                        />
                                    ) : (
                                        <div className="text-center text-gray-400">
                                            <PencilSquareIcon className="h-12 w-12 mx-auto mb-2" />
                                            <p className="text-sm">ยังไม่มีลายเซ็น</p>
                                        </div>
                                    )}
                                </div>

                                <Tooltip content="อัพโหลดหรือแก้ไขลายเซ็นของคุณ">
                                    <Button
                                        className="w-full bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-200"
                                        startContent={<PencilSquareIcon className="w-5 h-5" />}
                                        onClick={() => setIsSignatureModalOpen(true)}
                                    >
                                        เปลี่ยนลายเซ็น
                                    </Button>
                                </Tooltip>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </motion.div>

            <SignatureModal
                isOpen={isSignatureModalOpen}
                onClose={() => setIsSignatureModalOpen(false)}
                currentSignature={signaturePath}
                userId={me.id}
                onUploaded={(newUrl) => setSignaturePath(newUrl)}
            />
        </>
    );
}
