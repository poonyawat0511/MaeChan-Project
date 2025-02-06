"use client";
import Image from 'next/image'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignInResponse } from "@/utils/types/signInResponse";
import styles from './styles.module.css'
import logo from '../../../public/logo66.png'

import axios from "axios";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post<SignInResponse>(
        "http://localhost:8081/auth/signin",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      router.push("/");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "An error occurred");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <form
          className={styles.form}
          onSubmit={handleSignIn}
        >
          <Image src={logo} alt="Logo" width={200} height={100} className='w-full'/>
          
          <h1 className="text-2xl font-bold text-left mb-4">Sign In</h1>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div className="mb-4">
            <label className={styles.input_label}>Email</label>
            <input
              type="email"
              className={styles.textfield}
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className={styles.input_label}>Password</label>
            <input
              type="password"
              className={styles.textfield}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-[#003465] text-white py-2 px-4 rounded-md w-full"
          >
            Sign In
          </button>
        </form>
      </div>

    </div>
  );
};

export default SignInPage;
