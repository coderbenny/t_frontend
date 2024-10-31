"use client";
import React, { useState } from "react";
import Link from "next/link";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    // Simulate a registration process (replace with actual API call)
    console.log("Registering user:", { name, email, password });

    // Simulate successful registration
    setSuccessMessage("User registered successfully!");
    setError("");
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 p-4">
      <form
        className="w-full max-w-md bg-base-100 p-8 rounded-lg shadow-md"
        onSubmit={handleRegister}
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Admin Registration
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-center mb-4">{successMessage}</p>
        )}

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full text-gray-400"
            required
          />
        </div>

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
          Register
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
