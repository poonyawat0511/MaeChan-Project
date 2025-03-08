"use client"; // Ensures this runs only on the client side

import { useEffect, useState } from "react";
import liff from "@line/liff"; // Install using: npm install @line/liff

const LiffProfile = () => {
  const [user, setUser] = useState<{
    displayName: string;
    userId: string;
    pictureUrl: string;
  } | null>(null);

  useEffect(() => {
    const initializeLiff = async () => {
      try {
        await liff.init({ liffId: "2006520331-G14V6rPm" });

        if (liff.isLoggedIn()) {
          const profile = await liff.getProfile();
          setUser({
            displayName: profile.displayName,
            userId: profile.userId,
            pictureUrl: profile.pictureUrl || "",
          });
        } else {
          liff.login();
        }
      } catch (error) {
        console.error("LIFF Initialization failed", error);
      }
    };

    initializeLiff();
  }, []);

  const handleLogout = () => {
    liff.logout();
    setUser(null);
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center mt-10">
      {user ? (
        <div className="p-4 bg-gray-200 rounded-lg text-center">
          <img
            src={user.pictureUrl}
            alt="Profile"
            width={100}
            className="rounded-full"
          />
          <h2 className="mt-2 font-bold text-lg">Hello, {user.displayName}</h2>
          <p className="text-sm text-gray-600">UID: {user.userId}</p>
          <button
            onClick={handleLogout}
            className="mt-3 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default LiffProfile;
