"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignInResponse } from "@/utils/types/signInResponse";
import styles from "./styles.module.css";
import logo from "../../../public/logo66.png";
import { Input } from "@heroui/input";
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { Button } from "@heroui/button";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8081/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("An error occurred");
      }

      const data: SignInResponse = await response.json();

      localStorage.setItem("jwt", data.token);

      router.push("/all-stock-requests");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <form className={styles.form} onSubmit={handleSignIn}>
          <div className="flex w-full items-center justify-center">
            <Image
              src={logo}
              alt="Logo"
              height={100}
              className="flex items-center"
            />
          </div>

          <h1 className="text-2xl font-bold text-left mb-4">เข้าสู่ระบบ</h1>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="space-y-8">
            <Input
              label="อีเมล"
              labelPlacement="outside"
              placeholder="you@example.com"
              startContent={<EnvelopeIcon className="icon" />}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />

            <Input
              type={isVisible ? "text" : "password"}
              labelPlacement="outside"
              label="รหัสผ่าน"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              startContent={<KeyIcon className="icon" />}
              endContent={
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashIcon className="icon" />
                  ) : (
                    <EyeIcon className="icon" />
                  )}
                </button>
              }
              required
            />
          </div>

          <Button type="submit" className="bg-[#003465] text-white w-full">
            ลงชื่อเข้าใช้
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
