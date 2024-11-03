"use client";
import React, { useState } from "react";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setError("An error occurred during login.");
      } else {
        const data = await res.json();
        localStorage.setItem("access_token", JSON.stringify(data.access_token));
        alert("Login successful");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 p-4">
      <form
        className="w-full max-w-md bg-base-100 p-8 rounded-lg shadow-md"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-bold text-center mb-6 tracking-wide">
          Login
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full text-gray-400"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full text-gray-400"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-full mt-4">
          Login
        </button>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link href="/registration" className="text-primary font-semibold">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
