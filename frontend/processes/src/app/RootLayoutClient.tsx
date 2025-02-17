"use client";

import { usePathname } from "next/navigation";
import SideBar from "@/components/global/ui/SideBar";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Hide sidebar on sign-in and sign-up pages
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
