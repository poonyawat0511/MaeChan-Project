import {
    HomeIcon,
    ShieldCheckIcon,
    UserIcon,
    CalendarDaysIcon,
    ChartPieIcon,
    UserCircleIcon,
  } from "@heroicons/react/24/outline";
  
  export interface MenuItem {
    id: string;
    label: string;
    icon: React.ElementType;
    link: string;
  }
  
  export const userMenuItems: MenuItem[] = [
    { id: "all-stock-requests", label: "คำขอสั่งซื้อทั้งหมด", icon: HomeIcon, link: "/all-stock-requests" },
    { id: "task", label: "ภาระงาน", icon: ShieldCheckIcon, link: "/task" },
  ];
  
  export const adminMenuItems: MenuItem[] = [
    { id: "users", label: "จัดการผู้ใช้", icon: UserIcon, link: "/users" },
    { id: "days", label: "จัดการการแจ้งเตือน", icon: CalendarDaysIcon, link: "/days" },
  ];
  
  export const recentItems: MenuItem[] = [
    { id: "dashboard", label: "แดชบอร์ด", icon: ChartPieIcon, link: "/dashboard" },
    { id: "profile", label: "โปรไฟล์", icon: UserCircleIcon, link: "/profile" },
  ];
  