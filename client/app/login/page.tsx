"use client";
import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import axios, { AxiosResponse } from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import toast components

// Interfaces for type safety
interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string; // Optional token if authentication is successful
}

const LoginPage = () => {
  const [error, setError] = useState("");
  const [signin, setSignin] = useState<LoginCredentials>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignin({ ...signin, [name]: value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    try {
      const response: AxiosResponse = await axios.post(
        "/api/users/signin",
        signin
      );

      if (response.data.success) {
        // Handle successful login (e.g., store token, redirect to dashboard)
        console.log(response.data);
        toast.success("Login successful!"); // Show success toast
      } else {
        setError(response.data.message || "An error occurred.");
        toast.error(response.data.message || "Login failed!"); // Show error toast
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      toast.error("An error occurred. Please try again."); // Show error toast
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Head>
        <title>Login</title>
      </Head>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="email"
            value={signin.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            value={signin.password}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Log In
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
        {error && (
          <div className="text-red-500 text-xs italic mt-2">{error}</div>
        )}
        <ToastContainer />
      </form>
    </div>
  );
};

export default LoginPage;
