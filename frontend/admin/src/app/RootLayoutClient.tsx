"use client";

import SideBar from "@/components/ui/SideBar";
import { usePathname } from "next/navigation";


export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  const hideSidebar = pathname === "/signin" || pathname === "/signup";

  return (
    <div className="flex h-screen">
      <div className="flex w-full h-full">
        {!hideSidebar && <SideBar />}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
