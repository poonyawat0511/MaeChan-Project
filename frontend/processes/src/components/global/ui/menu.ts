import {
    HomeIcon,
    ShieldCheckIcon,
    UserIcon,
    CalendarDaysIcon,
    ChartPieIcon,
  } from "@heroicons/react/24/outline";
  
  export interface MenuItem {
    id: string;
    label: string;
    icon: React.ElementType;
    link: string;
  }
  
  export const userMenuItems: MenuItem[] = [
    { id: "all-stock-requests", label: "All Stock Requests", icon: HomeIcon, link: "/all-stock-requests" },
    { id: "task", label: "Task", icon: ShieldCheckIcon, link: "/task" },
  ];
  
  export const adminMenuItems: MenuItem[] = [
    { id: "users", label: "User Management", icon: UserIcon, link: "/users" },
    { id: "days", label: "Day Management", icon: CalendarDaysIcon, link: "/days" },
  ];
  
  export const recentItems: MenuItem[] = [
    { id: "dashboard", label: "Dashboard", icon: ChartPieIcon, link: "/dashboard" },
  ];
  