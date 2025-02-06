"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUpResponse } from "@/utils/types/signUpResponese";

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
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSignatureFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

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
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    }
  };

  return (
    <div className="flex h-full justify-center items-center bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          className="w-full p-2 border rounded-md mb-2"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          className="w-full p-2 border rounded-md mb-2"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded-md mb-2"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 border rounded-md mb-2"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="signature"
          accept="image/*"
          className="w-full p-2 border rounded-md mb-2"
          onChange={handleFileChange}
          required
        />
        <input
          type="text"
          name="userHospitalId"
          placeholder="User Hospital ID"
          className="w-full p-2 border rounded-md mb-2"
          value={formData.userHospitalId}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lineId"
          placeholder="Line ID"
          className="w-full p-2 border rounded-md mb-2"
          value={formData.lineId}
          onChange={handleChange}
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          className="w-full p-2 border rounded-md mb-2"
          value={formData.role}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md w-full"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
