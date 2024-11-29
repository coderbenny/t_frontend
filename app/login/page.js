"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { loginSuccess } from "@/redux/auth/authSlice";

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch(); // Get dispatch function from redux
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/ticko/login", {
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

        // Dispatch loginSuccess to store token and user data in Redux state
        dispatch(loginSuccess({ user: data.user, token: data.access_token }));
        sessionStorage.setItem("access_token", data.access_token);

        alert("Login successful");
        router.push("/dashboard");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-orange-100 to-orange-200 p-4">
      <form
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
        onSubmit={handleLogin}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-orange-600 tracking-wider">
          Login
        </h2>
        {error && (
          <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
        )}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 mb-2 font-semibold"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full text-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 mb-2 font-semibold"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full text-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>
        <button
          type="submit"
          className="btn w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition duration-150 ease-in-out transform hover:scale-105 active:scale-95 shadow-md"
        >
          Login
        </button>
        <p className="text-center mt-6 text-gray-700">
          Don’t have an account?{" "}
          <Link href="/registration">
            <span className="text-orange-500 hover:text-orange-600 font-semibold cursor-pointer transition-colors duration-150">
              Register
            </span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
