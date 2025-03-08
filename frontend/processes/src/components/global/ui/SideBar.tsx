"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import { jwtDecode } from "jwt-decode";
import { userMenuItems, adminMenuItems, recentItems } from "./menu";
import { motion } from "framer-motion";
import { axiosInstance, signOutApi } from "@/utils/api/api";

interface UserHospital {
  role: string;
}

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [user, setUser] = useState<UserHospital | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    try {
      const token = localStorage.getItem("jwt");
      if (token) {
        const decoded: UserHospital = jwtDecode(token);
        setUser(decoded);
      }
    } catch (error) {
      console.error("Error decoding JWT:", error);
    }
  }, []);

  useEffect(() => {
    const savedState = localStorage.getItem("sidebar-collapsed");
    if (savedState !== null) {
      setIsCollapsed(savedState === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", String(isCollapsed));
  }, [isCollapsed]);

  const menuItems = user?.role === "ADMIN" ? adminMenuItems : userMenuItems;

  const handleSignout = async () => {
    try {
      await axiosInstance.post(signOutApi);
      localStorage.removeItem("jwt");
      window.location.href = "/signin";
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <motion.aside
      className="relative min-h-screen bg-white p-4 flex flex-col shadow-lg"
      initial={{ width: "16rem" }}
      animate={{ width: isCollapsed ? "5rem" : "16rem" }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {/* Collapse Button with Animation */}
      <motion.button
        className="absolute top-4 -right-3 p-2 rounded-full bg-purple-500 text-white shadow-lg hover:bg-white hover:text-purple-500 transition-all transform hover:scale-110"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label="Toggle Sidebar"
        whileTap={{ scale: 0.9 }}
      >
        {isCollapsed ? (
          <ChevronRightIcon className="h-4 w-4 animate-pulse" />
        ) : (
          <ChevronLeftIcon className="h-4 w-4 animate-pulse" />
        )}
      </motion.button>

      {/* Logo with Animated Transition */}
      <motion.div
        className="flex justify-center items-center mb-6 h-12"
        initial={{ opacity: 1, scale: 1 }}
        animate={{
          opacity: isCollapsed ? 0.8 : 1,
          scale: isCollapsed ? 0.8 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src="/logo66.png"
          alt="Logo"
          width={isCollapsed ? 32 : 120}
          height={48}
          priority
          className="object-contain"
        />
      </motion.div>

      {/* Menu Section with Hover & Animation */}
      <nav className="mb-4">
        <motion.h2
          className="text-xs font-semibold text-gray-400 mb-2"
          animate={{ opacity: isCollapsed ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          Menu
        </motion.h2>
        {menuItems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
            className="w-full"
          >
            <Link
              href={item.link}
              className={`flex items-center w-full px-3 py-2 rounded-lg transition-all group ${
                pathname === item.link
                  ? "bg-red-50 text-red-500"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
            >
              <item.icon className="h-6 w-6 shrink-0 transition-transform duration-300 group-hover:rotate-6" />

              {/* Smooth hide/show with animation */}
              <motion.span
                className="ml-3 overflow-hidden whitespace-nowrap transition-all"
                initial={{ opacity: 0, width: 0 }}
                animate={{
                  opacity: isCollapsed ? 0 : 1,
                  width: isCollapsed ? 0 : "auto",
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {item.label}
              </motion.span>
            </Link>
          </motion.div>
        ))}
      </nav>

      {/* Recent Section with Hover Animation */}
      <nav className="mb-auto">
        <motion.h2
          className="text-xs font-semibold text-gray-400 mb-2"
          animate={{ opacity: isCollapsed ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          Recent
        </motion.h2>
        {recentItems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href={item.link}
              className={`flex items-center w-full px-3 py-2 rounded-lg transition-all group ${
                pathname === item.link
                  ? "bg-red-50 text-red-500"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
            >
              <item.icon className="h-6 w-6 shrink-0 transition-transform duration-300 hover:rotate-6" />
              <motion.span
                className="ml-3 overflow-hidden whitespace-nowrap transition-all"
                initial={{ opacity: 0, width: 0 }}
                animate={{
                  opacity: isCollapsed ? 0 : 1,
                  width: isCollapsed ? 0 : "auto",
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {item.label}
              </motion.span>
            </Link>
          </motion.div>
        ))}
      </nav>

      {/* Sign Out Button with Animation */}
      <motion.div
        className="p-4 border-t border-gray-200 mt-auto"
        whileHover={{ scale: 1.05 }}
      >
        <motion.button
          onClick={handleSignout}
          className={`w-full flex items-center text-red-600 gap-2 px-3 py-2 rounded-lg transition-all group ${
            isCollapsed ? "justify-center" : "justify-start"
          } hover:bg-red-100`}
          whileTap={{ scale: 0.95 }}
        >
          <PowerIcon className="h-6 w-6 shrink-0 transition-all duration-300 group-hover:rotate-12" />

          {/* Smooth hide/show with animation */}
          <motion.span
            className="overflow-hidden whitespace-nowrap transition-all min-w-0"
            initial={{ opacity: 0, width: 0 }}
            animate={{
              opacity: isCollapsed ? 0 : 1,
              width: isCollapsed ? 0 : "auto",
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
           ลงชื่อออก
          </motion.span>
        </motion.button>
      </motion.div>
    </motion.aside>
  );
};

export default SideBar;
