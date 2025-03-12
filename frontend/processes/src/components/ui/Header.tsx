"use client";

import React from "react";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <nav className="fixed w-full top-0 z-50 bg-white/5 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-20">
          <div className="flex justify-center relative group">
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-300 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
            <Image
              src="/logo66.png"
              alt="Taskk Logo"
              width={48}
              height={48}
              className="h-12 w-auto relative"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
