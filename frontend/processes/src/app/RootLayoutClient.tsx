"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SideBar from "@/components/Default/SideBar";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const hideSidebar =
    isClient && (pathname === "/signin" || pathname === "/signup");

  return (
    <div className="flex h-screen">
      <div className="flex w-full h-full">
        {!hideSidebar && <SideBar />}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
