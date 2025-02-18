"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signUpResponse } from "@/utils/types/signUpResponese";
import styles from "./styles.module.css";
import { Input } from "@heroui/input";
import { Button, Form, Link, Select, SelectItem } from "@heroui/react";
import liff from "@line/liff";

export default function SignUpPage() {
  const [formData, setFormData] = useState<Partial<signUpResponse>>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userHospitalId: "",
    lineId: "",
    role: [],
  });

  const [signatureFile, setSignatureFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: boolean;
  }>({});
  const router = useRouter();

  useEffect(() => {
    const initializeLiff = async () => {
      try {
        await liff.init({ liffId: "2006520331-G14V6rPm" });

        if (!liff.isLoggedIn()) {
          liff.login();
          return;
        }

        const profile = await liff.getProfile();
        setFormData((prevData) => ({
          ...prevData,
          lineId: profile.userId,
        }));
      } catch (error) {
        console.error("LIFF Initialization failed", error);
      }
    };

    initializeLiff();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: false,
    })); // Clear error
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSignatureFile(e.target.files[0]);
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        signature: false,
      }));
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: boolean } = {};

    if (!formData.firstName) errors.firstName = true;
    if (!formData.lastName) errors.lastName = true;
    if (!formData.email) errors.email = true;
    if (!formData.password) errors.password = true;
    if (!signatureFile) errors.signature = true;

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      setError("กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน");
      return;
    }

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) data.append(key, value.toString());
      });

      if (signatureFile) {
        data.append("signature", signatureFile);
      }

      const response = await fetch("http://localhost:8081/auth/signup", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "An error occurred");
      }

      console.log("Signup Successful:", await response.json());
      router.push("/signin");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Form className={styles.form} onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center w-full mt-5">
            ลงทะเบียนบัญชีผู้ใช้
          </h2>
          {error && <p className="text-red-500 text-sm mb-1">{error}</p>}
          <div className="flex space-x-5 w-full">
            <Input
              type="text"
              name="firstName"
              label={`ชื่อ ${validationErrors.firstName ? "*" : ""}`}
              value={formData.firstName}
              onChange={handleChange}
              className={validationErrors.firstName ? "border-red-500" : ""}
            />
            <Input
              type="text"
              name="lastName"
              label={`นามสกุล ${validationErrors.lastName ? "*" : ""}`}
              value={formData.lastName}
              onChange={handleChange}
              className={validationErrors.lastName ? "border-red-500" : ""}
            />
          </div>
          <Input
            type="email"
            name="email"
            label={`อีเมล ${validationErrors.email ? "*" : ""}`}
            value={formData.email}
            onChange={handleChange}
            className={validationErrors.email ? "border-red-500" : ""}
          />
          <Input
            type="password"
            name="password"
            label={`รหัสผ่าน ${validationErrors.password ? "*" : ""}`}
            value={formData.password}
            onChange={handleChange}
            className={validationErrors.password ? "border-red-500" : ""}
          />
          <Input
            type="file"
            name="signature"
            label={`เลือกลายเซ็น ${validationErrors.signature ? "*" : ""}`}
            accept="image/*"
            onChange={handleFileChange}
            className={validationErrors.signature ? "border-red-500" : ""}
          />
          <Input
            type="text"
            name="userHospitalId"
            label="รหัสประจำตัวโรงพยาบาล"
            value={formData.userHospitalId}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="lineId"
            label="Line ID"
            value={formData.lineId}
            readOnly
          />
          <Select name="role" label="ตำแหน่ง" value={formData.role}>
            <SelectItem key="APPROVER" value="APPROVER">
              ผู้ตรวจสอบ
            </SelectItem>
            <SelectItem key="DIRECTOR" value="DIRECTOR">
              ผู้อำนวยการ
            </SelectItem>
          </Select>
          <Button
            type="submit"
            className="bg-blue-500 text-white py-1 px-3 rounded-xl w-full"
          >
            ลงทะเบียน
          </Button>
          <p className="font-bold">
            <Link href="/signin">
              <span className="text-black text-xs">ลงชื่อเข้าใช้</span>
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
}
