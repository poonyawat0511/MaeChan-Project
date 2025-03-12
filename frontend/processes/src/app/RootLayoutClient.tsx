"use client";

import { usePathname } from "next/navigation";
import SideBar from "@/components/ui/SideBar";

const AUTH_PAGES = ["/signin", "/signup"];
const LANDING_PAGE = "/";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = AUTH_PAGES.includes(pathname);
  const isLandingPage = pathname === LANDING_PAGE;

  return (
    <div className="flex h-screen">
      {!isAuthPage && !isLandingPage && <SideBar />}
      <main className={`flex-1`}>
        {children}
      </main>
    </div>
  );
}
