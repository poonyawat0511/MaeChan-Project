"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import { axiosInstance, signOutApi } from "@/utils/api/api";
import { userMenuItems, adminMenuItems, recentItems } from "./menu";
import ConfirmSignOut from "./_components/modals/ConfirmSignOut";

interface UserHospital {
  role: string;
}

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [user, setUser] = useState<UserHospital | null>(null);
  const pathname = usePathname();
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get<UserHospital>("/auth/me", {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUser();
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

  const getMenuItems = () => {
    if (!user) return [];

    switch (user.role) {
      case "ADMIN":
        return adminMenuItems;
      case "USER":
        return userMenuItems.filter((item) =>
          ["/dashboard", "/profile"].includes(item.link)
        );
      default:
        return userMenuItems;
    }
  };

  const handleSignOut = async () => {
    try {
      await axiosInstance.post(signOutApi, {}, { withCredentials: true });
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
      transition={{ duration: 0.4 }}
    >
      {/* Toggle Sidebar Button */}
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

      {/* Logo */}
      <motion.div
        className="flex justify-center items-center mb-6 h-12"
        animate={{
          opacity: isCollapsed ? 0.8 : 1,
          scale: isCollapsed ? 0.8 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <Link href="/">
          <Image
            src="/logo66.png"
            alt="Logo"
            width={isCollapsed ? 32 : 120}
            height={48}
            priority
            className="object-contain"
          />
        </Link>
      </motion.div>

      {/* Menu */}
      <nav className="mb-4">
        <motion.h2
          className="text-xs font-semibold text-gray-400 mb-2"
          animate={{ opacity: isCollapsed ? 0 : 1 }}
        >
          Menu
        </motion.h2>

        {getMenuItems().map((item) => (
          <motion.div key={item.id} whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
            <Link
              href={item.link}
              className={`flex items-center w-full px-3 py-2 rounded-lg transition-all group ${
                pathname === item.link
                  ? "bg-red-50 text-red-500"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
            >
              <item.icon className="h-6 w-6 shrink-0 group-hover:rotate-6 transition-transform" />
              <motion.span
                className="ml-3 overflow-hidden whitespace-nowrap"
                animate={{
                  opacity: isCollapsed ? 0 : 1,
                  width: isCollapsed ? 0 : "auto",
                }}
              >
                {item.label}
              </motion.span>
            </Link>
          </motion.div>
        ))}
      </nav>

      {/* Recents */}
      <nav className="mb-auto">
        <motion.h2
          className="text-xs font-semibold text-gray-400 mb-2"
          animate={{ opacity: isCollapsed ? 0 : 1 }}
        >
          Recent
        </motion.h2>
        {recentItems.map((item) => (
          <motion.div key={item.id} whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
            <Link
              href={item.link}
              className={`flex items-center w-full px-3 py-2 rounded-lg transition-all group ${
                pathname === item.link
                  ? "bg-red-50 text-red-500"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
            >
              <item.icon className="h-6 w-6 shrink-0 transition-transform group-hover:rotate-6" />
              <motion.span
                className="ml-3 overflow-hidden whitespace-nowrap"
                animate={{
                  opacity: isCollapsed ? 0 : 1,
                  width: isCollapsed ? 0 : "auto",
                }}
              >
                {item.label}
              </motion.span>
            </Link>
          </motion.div>
        ))}
      </nav>

      {/* Sign Out */}
      <motion.div className="p-4 border-t border-gray-200 mt-auto" whileHover={{ scale: 1.05 }}>
        <motion.button
          onClick={() => setIsOpenModal(true)}
          className={`w-full flex items-center text-red-600 gap-2 px-3 py-2 rounded-lg group ${
            isCollapsed ? "justify-center" : "justify-start"
          } hover:bg-red-100`}
          whileTap={{ scale: 0.95 }}
        >
          <PowerIcon className="h-6 w-6 group-hover:rotate-12 transition-transform" />
          <motion.span
            className="overflow-hidden whitespace-nowrap"
            animate={{
              opacity: isCollapsed ? 0 : 1,
              width: isCollapsed ? 0 : "auto",
            }}
          >
            ลงชื่อออก
          </motion.span>
        </motion.button>
      </motion.div>

      <ConfirmSignOut
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onConfirm={handleSignOut}
      />
    </motion.aside>
  );
};

export default SideBar;
