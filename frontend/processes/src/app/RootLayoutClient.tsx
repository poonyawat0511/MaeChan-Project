"use client";

import { usePathname } from "next/navigation";
import SideBar from "@/components/Default/SideBar";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideSidebar = pathname === "/signin";

  return (
    <div className="flex h-screen">
      <div className="flex w-full h-full">
        {!hideSidebar && <SideBar />}
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}
