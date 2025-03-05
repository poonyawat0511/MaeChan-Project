"use client";
import { ElementType, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PowerIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

interface MenuItem {
  id: string;
  label: string;
  icon: ElementType;
  link: string;
}

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    {
      id: "ListUser",
      label: "List User",
      icon: UserGroupIcon,
      link: "/users",
    },
    {
      id: "days",
      label: "Day",
      icon: CalendarDaysIcon,
      link: "/days",
    },
  ];

  useEffect(() => {
    const savedState = localStorage.getItem("sidebar-collapsed");
    if (savedState !== null) {
      setIsCollapsed(savedState === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", String(isCollapsed));
  }, [isCollapsed]);

  const handleSignout = async () => {
    try {
      await fetch("http://localhost:8081/auth/signout", {
        method: "POST",
        credentials: "include",
      });
      document.cookie = "jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      localStorage.removeItem("jwt");
      window.location.href = "/signin";
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <div
      className={`relative min-h-screen bg-white p-4 flex flex-col shadow-lg transition-all duration-500 ease-in-out ${
        isCollapsed ? "w-[5rem]" : "w-[16rem]"
      }`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Collapse Button */}
      <button
        className={`absolute top-4 -right-3 p-2 rounded-full bg-purple-500 text-white shadow-lg hover:bg-white 
    transition-all duration-300 transform hover:scale-110 ${
      isHovering ? "opacity-100 flex" : "opacity-70"
    } hover:text-purple-500`}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronRightIcon className="h-4 w-4 animate-pulse" />
        ) : (
          <ChevronLeftIcon className="h-4 w-4 animate-pulse" />
        )}
      </button>

      {/* Logo Container */}
      <div className="flex justify-center items-center mb-6 h-12 overflow-hidden">
        {isCollapsed ? (
          <div className="w-8 h-8 flex items-center justify-center">
            <Image
              src="/logo66.png"
              alt="Logo"
              width={32}
              height={32}
              className="object-contain transition-all duration-500 transform scale-100"
              priority
            />
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <Image
              src="/logo66.png"
              alt="Logo"
              width={120}
              height={48}
              className="object-contain transition-all duration-500 transform scale-100"
              priority
            />
          </div>
        )}
      </div>

      {/* Menu Section */}
      <div className="mb-4">
        <h2
          className={`text-[11px] font-semibold tracking-wide text-gray-400 mb-2 
          transition-opacity duration-300 ${
            isCollapsed ? "opacity-0" : "opacity-100"
          }`}
        >
          Menu
        </h2>
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={item.link}
              className={`relative flex items-center px-3 py-2 rounded-lg transition-all duration-300 
                ${
                  pathname === item.link
                    ? "bg-red-50 text-red-500"
                    : "hover:bg-gray-50 text-gray-700"
                }
                transform hover:translate-x-1`}
            >
              {pathname === item.link && (
                <div className="absolute left-0 w-1 h-8 bg-red-500 rounded-r-md animate-pulse" />
              )}
              <item.icon
                className={`h-6 w-6 shrink-0 transition-transform duration-300 ${
                  isCollapsed ? "scale-110" : ""
                }`}
              />
              <span
                className={`ml-3 whitespace-nowrap transition-all duration-300 
                ${isCollapsed ? "opacity-0 w-0" : "opacity-100"}`}
              >
                {item.label}
              </span>
            </a>
          ))}
        </nav>
      </div>

      {/* Sign Out Button */}
      <div className="p-4 border-t border-gray-200 mt-auto">
        <button
          className="w-full flex items-center justify-center text-red-600 hover:bg-red-100 gap-2 px-3 py-2 rounded-lg 
            transition-all duration-300 transform hover:translate-x-1 group"
          onClick={handleSignout}
        >
          <PowerIcon
            className={`h-6 w-6 shrink-0 transition-all duration-300 group-hover:rotate-12 
            ${isCollapsed ? "ml-0" : ""}`}
          />
          <span
            className={`transition-all duration-300 
            ${isCollapsed ? "hidden" : "block"}`}
          >
            Sign Out
          </span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
