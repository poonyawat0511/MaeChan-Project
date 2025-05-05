'use client'
import { motion } from "framer-motion";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import ProfileCard from "./_components/cards/ProfileCard";
import useProfile from "./hooks/useProfile";

export default function ProfilePage() {
    const { Me, isLoading, error } = useProfile();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col items-center justify-center p-4">
                <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                </div>
                <h3 className="text-xl font-medium text-indigo-900 animate-pulse">กำลังโหลดข้อมูลโปรไฟล์...</h3>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
                <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-md w-full border border-red-100">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">ไม่สามารถโหลดข้อมูลได้</h3>
                        <p className="text-sm text-gray-600 mb-4">{error.message}</p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 text-sm font-medium"
                        >
                            ลองใหม่อีกครั้ง
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6">
            <motion.div 
                className="max-w-5xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div 
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-100 mb-4">
                        <UserCircleIcon className="h-12 w-12 text-indigo-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-indigo-900 mb-2">
                        โปรไฟล์ของฉัน
                    </h1>
                    <p className="text-lg text-indigo-700/70 font-medium">
                        ข้อมูลส่วนตัวและลายเซ็น
                    </p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <ProfileCard me={Me} />
                </motion.div>
            </motion.div>
        </div>
    );
}