"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SignInResponse } from "@/utils/types/signInResponse";
import axios from "axios";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post<SignInResponse>(
        "http://localhost:8081/auth/signin",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const { token } = response.data;
      if (isClient) {
        localStorage.setItem("token", token);
      }
      router.push("/"); // Redirect to the home page after successful sign-in
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "An error occurred");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
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
