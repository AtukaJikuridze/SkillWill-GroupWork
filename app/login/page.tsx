"use client";
import { loginUser } from "@/services/auth";
import { useRouter } from "next/navigation";
import React, { Suspense, useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    const user = await loginUser(email, password);

    if (user) {
      document.cookie = `uuid=${user._uuid}; path=/`;
      router.push(`/${user.role}`);
    } else setError("User Couldn't Be Found");
  };

  const handleRegisterRedirect = () => router.push("/register");

  return (
    <Suspense>
      <form
        onSubmit={handleLogin}
        className="max-w-md mx-auto p-4 bg-white rounded shadow"
      >
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && <div className="text-red-600 mb-2">{error}</div>}

        <button
          type="submit"
          className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>

        <button
          type="button"
          onClick={handleRegisterRedirect}
          className="cursor-pointer w-full mt-3 text-blue-600 hover:underline"
        >
          Don't have an account? Register
        </button>
      </form>
    </Suspense>
  );
};

export default LoginPage;
