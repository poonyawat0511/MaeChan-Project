"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import HomeIcon from "../icons/home.icon";
import ArrowRightIcon from "../icons/arrowRight.icon";
import TaskIcon from "../icons/task.icon";
import ArrowLeftIcon from "../icons/arrowLeft.icon";
import SignoutIcon from "../icons/signout.icon";

const buttons = [
  {
    label: "All Stock Requests",
    icon: <HomeIcon size={20} />,
    link: "/all-stock-requests",
  },
  { label: "Approver", icon: <TaskIcon size={20} />, link: "/approver" },
  { label: "Director", icon: <TaskIcon size={20} />, link: "/director" },
];

const buttons2 = [
  {
    label: "Purchasing work",
    icon: <ArrowLeftIcon />,
    link: "/all-stock-requests",
  },
  {
    label: "Treasury work",
    icon: <ArrowLeftIcon />,
    link: "/all-stock-requests",
  },
  {
    label: "Distribution Unit",
    icon: <ArrowLeftIcon />,
    link: "/all-stock-requests",
  },
];

const buttons3 = [{ label: "Sign Out", icon: <SignoutIcon size={20} /> }];

const SideBar = () => {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleNavigation = (link: string, label: string) => {
    setSelectedButton(label);
    router.push(link);
  };

  const handleSignout = async () => {
    try {
      await fetch("http://localhost:8081/auth/signout", {
        method: "POST",
        credentials: "include",
      });
      document.cookie = "jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      localStorage.removeItem("jwt");
      router.push("/signin");
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <div className="relative h-full flex">
      {/* Sidebar */}
      <div
        className={`h-full ${
          isCollapsed ? "w-[5rem]" : "w-[15rem]"
        } bg-white shadow-lg p-5 flex flex-col border-r border-gray-200 transition-all duration-300 items-center`}
      >
        {/* Logo */}
        <div className={`mb-8 text-center ${isCollapsed ? "hidden" : ""}`}>
          <img src="/logo66.png" alt="Logo" className="w-25 mx-auto" />
        </div>

        {/* Menu */}
        <div className="mb-5">
          <h3
            className={`text-lg font-semibold text-gray-700 mb-3 ${
              isCollapsed ? "hidden" : ""
            }`}
          >
            Menu
          </h3>
          <div className="flex flex-col gap-2">
            {buttons.map(({ label, icon, link }) => (
              <button
                key={label}
                onClick={() => handleNavigation(link, label)}
                className={`flex items-center gap-2 p-2 w-full rounded-lg text-left transition-all ${
                  selectedButton === label ? "bg-gray-200" : "hover:bg-gray-100"
                }`}
              >
                {icon} {!isCollapsed && label}
              </button>
            ))}
          </div>
        </div>

        {/* Recent */}
        <div className="mt-5">
          <h3
            className={`text-lg font-semibold text-gray-700 mb-3 ${
              isCollapsed ? "hidden" : ""
            }`}
          >
            Recent
          </h3>
          <div className="flex flex-col gap-2">
            {buttons2.map(({ label, icon, link }) => (
              <button
                key={label}
                onClick={() => handleNavigation(link, label)}
                className={`p-2 w-full rounded-lg text-left transition-all ${
                  selectedButton === label ? "bg-gray-200" : "hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  {!isCollapsed && label}
                  {icon}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Sign Out */}
        <div className="mt-auto border-t pt-4 w-full">
          <div className="flex flex-col gap-2">
            {buttons3.map(({ label, icon }) => (
              <button
                key={label}
                onClick={handleSignout}
                className={`p-2 w-full rounded-lg text-left transition-all ${
                  selectedButton === label ? "bg-gray-200" : "hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  {!isCollapsed && label}
                  {icon}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Collapse Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-5 right-0 transform translate-x-1/2 bg-primary border border-gray-300 shadow-md rounded-full p-1 transition-all hover:bg-gray-100"
      >
        {isCollapsed ? (
          <ArrowLeftIcon className="text-white w-4 h-4" />
        ) : (
          <ArrowRightIcon className="text-white w-4 h-4" />
        )}
      </button>
    </div>
  );
};

export default SideBar;
