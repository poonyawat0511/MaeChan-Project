import { axiosInstance, MeApi } from "@/utils/api/api";
import { Me } from "@/utils/types/me"
import { useEffect, useState } from "react"
import { useAlert } from "@/components/alerts/GlobalAlertProvider";

export default function useProfile() {
    const [me, setMe] = useState<Me | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const { showAlert } = useAlert();

    useEffect(() => {
        const fetchMe = async () => {
            try {
                setIsLoading(true);
                setError(null);
                
                const res = await axiosInstance.get<Me>(MeApi);
                
                // Add a slight delay for better UX
                setTimeout(() => {
                    setMe(res.data);
                    setIsLoading(false);
                }, 300);
                
            } catch (err: any) {
                console.error("Error fetching profile:", err);
                
                // Handle different error types
                if (err.response) {
                    // Server responded with an error status code
                    if (err.response.status === 401) {
                        showAlert("กรุณาเข้าสู่ระบบก่อนเข้าถึงข้อมูลโปรไฟล์", "warning");
                    } else if (err.response.status === 404) {
                        showAlert("ไม่พบข้อมูลโปรไฟล์", "danger");
                    } else {
                        showAlert(`เกิดข้อผิดพลาด: ${err.response.data?.message || "ไม่สามารถเข้าถึงข้อมูลได้"}`, "danger");
                    }
                } else if (err.request) {
                    // Request was made but no response received
                    showAlert("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง", "danger");
                } else {
                    // Error in setting up the request
                    showAlert("เกิดข้อผิดพลาดในการโหลดข้อมูล", "danger");
                }
                
                setError(err as Error);
                setIsLoading(false);
            }
        };
        
        fetchMe();
    }, [showAlert]);

    const refetchProfile = async () => {
        try {
            setIsLoading(true);
            const res = await axiosInstance.get<Me>(MeApi);
            setMe(res.data);
            setError(null);
            showAlert("อัพเดทข้อมูลโปรไฟล์สำเร็จ", "success");
        } catch (err) {
            console.error("Error refetching profile:", err);
            setError(err as Error);
            showAlert("ไม่สามารถอัพเดทข้อมูลโปรไฟล์ได้", "danger");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        Me: me,
        isLoading,
        error,
        refetchProfile
    };
}