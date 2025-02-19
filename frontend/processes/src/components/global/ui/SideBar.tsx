"use client";
import { ElementType, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  CurrencyDollarIcon,
  TruckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PowerIcon,
  UserGroupIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { jwtDecode } from "jwt-decode";

interface MenuItem {
  id: string;
  label: string;
  icon: ElementType;
  link: string;
  roles?: string[];
}

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      try {
        const decodedToken = jwtDecode<{ role?: string }>(token);
        setUserRole(decodedToken.role || "USER");
      } catch (error) {
        console.error("Invalid token", error);
        setUserRole("USER");
      }
    } else {
      setUserRole("USER");
    }
  }, []);

  const menuItems: MenuItem[] = [
    {
      id: "all-stock-requests",
      label: "All Stock Requests",
      icon: HomeIcon,
      link: "/all-stock-requests",
      roles: ["APPROVER", "DIRECTOR", "USER", "ADMIN"],
    },
    {
      id: "approver",
      label: "Approver",
      icon: UserGroupIcon,
      link: "/approver",
      roles: ["APPROVER"],
    },
    {
      id: "director",
      label: "Director",
      icon: ShieldCheckIcon,
      link: "/director",
      roles: ["DIRECTOR"],
    },
  ];

  const filteredMenuItems = menuItems.filter(
    (item) => !item.roles || item.roles.includes(userRole || "")
  );

  const recentItems: MenuItem[] = [
    {
      id: "purchasing",
      label: "Purchasing work",
      icon: ClipboardDocumentListIcon,
      link: "/dashboard",
    },
    {
      id: "treasury",
      label: "Treasury work",
      icon: CurrencyDollarIcon,
      link: "/dashboard",
    },
    {
      id: "distribution",
      label: "Distribution Unit",
      icon: TruckIcon,
      link: "/dashboard",
    },
  ];

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
          {filteredMenuItems.map((item) => (
            <a
              key={item.id}
              href={item.link}
              className={`flex items-center px-3 py-2 rounded-lg transition-all duration-300 ${
                pathname === item.link
                  ? "bg-red-50 text-red-500"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
            >
              <item.icon className="h-6 w-6" />
              <span className={`ml-3 ${isCollapsed ? "hidden" : "block"}`}>
                {item.label}
              </span>
            </a>
          ))}
        </nav>
      </div>

      {/* Recent Section */}
      <div className="mb-auto">
        <h2
          className={`text-[11px] font-semibold tracking-wide text-gray-400 mb-2 
          transition-opacity duration-300 ${
            isCollapsed ? "opacity-0" : "opacity-100"
          }`}
        >
          Recent
        </h2>
        <nav className="flex flex-col gap-2">
          {recentItems.map((item) => (
            <a
              key={item.id}
              href={item.link}
              className="flex items-center px-3 py-2 hover:bg-gray-50 rounded-lg 
                transition-all duration-300 text-gray-600 transform hover:translate-x-1"
            >
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
