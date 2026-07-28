"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DonorSignup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    // In a real app this would send the data to the server.
    router.push("/thank-you");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col">
      {/* Navbar */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-orange-100">
        <Link href="/" className="text-2xl font-bold text-orange-500 tracking-tight">
          NextSpark
        </Link>
      </header>

      {/* Form */}
      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-10">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            Sign up as a Donor
          </h1>
          <p className="text-gray-500 mb-8 text-sm leading-relaxed">
            Join NextSpark and start connecting your unused goods with people
            who need them. We&apos;ll take care of the rest.
          </p>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-gray-700"
              >
                Email address <span className="text-orange-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="you@example.com"
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
              />
              {error && (
                <p className="text-xs text-red-500 mt-0.5">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="mt-2 rounded-full bg-orange-500 text-white py-3 text-sm font-semibold shadow hover:bg-orange-600 transition-colors"
            >
              Get Early Access
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-400">
            Are you a shelter or organization?{" "}
            <Link
              href="/signup/organization"
              className="text-orange-500 font-medium hover:underline"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
