import BlurModal from "@/components/modals/BlurModal";

interface ConfirmSignOutProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
}

export default function ConfirmSignOut({ isOpen, onClose, onConfirm, title = "ยืนยันการออกจากระบบ", message = "คุณต้องการออกจากระบบใช่หรือไม่" }: ConfirmSignOutProps) {
    return (
        <BlurModal isOpen={isOpen} onClose={onClose} onAction={onConfirm} title={title} actionLabel="ยืนยัน">
            <p>{message}</p>
        </BlurModal>
    )
}