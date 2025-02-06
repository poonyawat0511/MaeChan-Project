"use client";
import Image from 'next/image'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SignInResponse } from "@/utils/types/signInResponse";
import styles from './styles.module.css';
import logo from '../../../public/logo66.png';
import { Input } from '@heroui/input';
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, KeyIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Button } from '@heroui/button';

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
      const data: SignInResponse = await fetch("http://localhost:8081/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      },);

      router.push("/");
    } catch (err) {
      setError(err.response.data.message);
    }
  };




  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <form
          className={styles.form}
          onSubmit={handleSignIn}
        >
          <div className='flex w-full items-center justify-center'>
            <Image src={logo} alt="Logo" height={100} className='flex items-center' />
          </div>

          <h1 className="text-2xl font-bold text-left mb-4">Sign In</h1>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="space-y-8">
            <Input
              label="Email"
              labelPlacement="outside"
              placeholder="you@example.com"
              startContent={
                <EnvelopeIcon className="icon" />
              }
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />

            <Input
              type={isVisible ? "text" : "password"}
              labelPlacement='outside'
              label="Password"
              placeholder="********"

              value={password}
              onChange={(e) => setPassword(e.target.value)}
              startContent={
                <KeyIcon className="icon" />
              }
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

          <Button
            type="submit"
            className="bg-[#003465] text-white w-full"
          >
            Sign In
          </Button>
        </form>
      </div>

    </div>
  );
};

export default SignInPage;
