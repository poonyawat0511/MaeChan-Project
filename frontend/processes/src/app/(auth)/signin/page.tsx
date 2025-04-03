"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import logo from "../../../../public/logo66.png";

import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { Button } from "@heroui/button";
import { Form, Input, Link } from "@heroui/react";

const SignInPage = () => {
  const [isResetMode, setIsResetMode] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleNewPassword, setIsVisibleNewPassword] = useState(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const router = useRouter();

  // Sign In State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Reset Password State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8081/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!response.ok) throw new Error("Invalid email or password.");
      router.push("/all-stock-requests");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("รหัสผ่านไม่ตรงกัน");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          newPassword,
          confirmPassword,
        }),
      });

      if (!response.ok) throw new Error("ไม่สามารถรีเซ็ตรหัสผ่านได้");

      setMessage("รีเซ็ตรหัสผ่านสำเร็จ! กรุณาเข้าสู่ระบบใหม่");
      setTimeout(() => {
        setIsResetMode(false);
        setEmail("");
        setPassword("");
      }, 2000);
    } catch {
      setError("เกิดข้อผิดพลาดขณะรีเซ็ตรหัสผ่าน");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Form
          className={styles.form}
          onSubmit={isResetMode ? handleResetPassword : handleSignIn}
        >
          <div className="flex w-full items-center justify-center">
            <Image
              src={logo}
              alt="Logo"
              height={100}
              className="flex items-center"
            />
          </div>

          <h1 className="text-2xl font-bold text-left mb-4 text-white">
            {isResetMode ? "รีเซ็ตรหัสผ่าน" : "เข้าสู่ระบบ"}
          </h1>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {message && <p className="text-green-500 text-sm mb-4">{message}</p>}

          <div className="space-y-6 w-full">
            {isResetMode ? (
              <>
                <Input
                  label="ชื่อ"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="text-white"
                />
                <Input
                  label="นามสกุล"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="text-white"
                />
                <Input
                  label="อีเมล"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="text-white"
                />
                <Input
                  label="รหัสผ่านใหม่"
                  type={isVisibleNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="text-white"
                  endContent={
                    <button
                      aria-label="toggle new password visibility"
                      className="focus:outline-none"
                      type="button"
                      onClick={() => setIsVisibleNewPassword((prev) => !prev)}
                    >
                      {isVisibleNewPassword ? (
                        <EyeSlashIcon className="icon text-white" />
                      ) : (
                        <EyeIcon className="icon text-white" />
                      )}
                    </button>
                  }
                />
                <Input
                  label="ยืนยันรหัสผ่าน"
                  type={isVisibleConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="text-white"
                  endContent={
                    <button
                      aria-label="toggle confirm password visibility"
                      className="focus:outline-none"
                      type="button"
                      onClick={() => setIsVisibleConfirmPassword((prev) => !prev)}
                    >
                      {isVisibleConfirmPassword ? (
                        <EyeSlashIcon className="icon text-white" />
                      ) : (
                        <EyeIcon className="icon text-white" />
                      )}
                    </button>
                  }
                />
              </>
            ) : (
              <>
                <div className="flex flex-col gap-6 w-full">
                  <Input
                    label="อีเมล"
                    labelPlacement="outside"
                    placeholder="you@example.com"
                    startContent={<EnvelopeIcon className="icon text-white" />}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="text-white"
                  />

                  <Input
                    type={isVisible ? "text" : "password"}
                    labelPlacement="outside"
                    label="รหัสผ่าน"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    startContent={<KeyIcon className="icon text-white" />}
                    endContent={
                      <button
                        aria-label="toggle password visibility"
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <EyeSlashIcon className="icon text-white" />
                        ) : (
                          <EyeIcon className="icon text-white" />
                        )}
                      </button>
                    }
                    required
                    className="text-white"
                  />
                </div>

              </>
            )}
          </div>

          <Button type="submit" className="bg-[#003465] text-white w-full mt-4">
            {isResetMode ? "รีเซ็ตรหัสผ่าน" : "ลงชื่อเข้าใช้"}
          </Button>

          <div className="flex justify-between items-center mt-4 w-full text-xs">
  {!isResetMode ? (
    <>
      <Link href="/signup">
        <span className="text-white underline hover:text-blue-200 transition">ลงทะเบียนบัญชีผู้ใช้</span>
      </Link>
      <button
        type="button"
        onClick={() => setIsResetMode(true)}
        className="underline text-white hover:text-blue-200 transition"
      >
        ลืมรหัสผ่าน?
      </button>
    </>
  ) : (
    <button
      type="button"
      onClick={() => setIsResetMode(false)}
      className="underline text-white hover:text-blue-200 transition w-full text-center"
    >
      กลับไปหน้าเข้าสู่ระบบ
    </button>
  )}
</div>

        </Form>
      </div>
    </div>
  );
};

export default SignInPage;
