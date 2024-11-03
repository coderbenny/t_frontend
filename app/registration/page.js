// pages/register.js
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const InputField = ({ id, label, type, value, onChange }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-gray-700 mb-2 font-semibold">
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className="input input-bordered w-full text-gray-800 focus:border-orange-500 focus:ring-2 focus:ring-orange-400"
      required
    />
  </div>
);

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic validation
    if (Object.values(formData).some((field) => !field)) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin-registration`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setSuccessMessage("User registered successfully!");
        setError("");
        setFormData({ name: "", email: "", phone: "", password: "" }); // Reset form data
      } else {
        const { message } = await response.json(); // Assuming server returns a message
        setError(message || "Registration was not successful!");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  // Clear success message after 5 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-orange-100 to-orange-200 p-4">
      <form
        className="w-full max-w-md mt-20 bg-white p-8 rounded-lg shadow-lg"
        onSubmit={handleRegister}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-orange-600 tracking-wider">
          Admin Registration
        </h2>
        {error && (
          <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
        )}
        {successMessage && (
          <p className="text-green-500 text-center mb-4 font-medium">
            {successMessage}
          </p>
        )}

        <InputField
          id="name"
          label="Name"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />
        <InputField
          id="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <InputField
          id="phone"
          label="Phone"
          type="text"
          value={formData.phone}
          onChange={handleChange}
        />
        <InputField
          id="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="btn w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition duration-150 ease-in-out transform hover:scale-105 active:scale-95 shadow-md"
        >
          Register
        </button>

        <p className="text-center mt-6 text-gray-700">
          Already have an account?{" "}
          <Link href="/login">
            <span className="text-orange-500 hover:text-orange-600 font-semibold cursor-pointer transition-colors duration-150">
              Login
            </span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
