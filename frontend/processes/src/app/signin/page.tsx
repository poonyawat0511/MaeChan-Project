"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignInResponse } from "@/utils/types/signInResponse";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

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
  
      router.push("/dashboard");
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
    }
  };
  

  return (
    <div className="flex h-full justify-center items-center">
      <form
        className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full"
        onSubmit={handleSignIn}
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Sign In</h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded-md"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded-md"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md w-full"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignInPage;
