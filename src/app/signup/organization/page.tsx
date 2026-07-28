"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function OrganizationSignup() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", location: "", bio: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const next: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      next.email = "Email is required.";
    } else if (!emailRegex.test(form.email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (!form.location.trim()) next.location = "Location is required.";
    if (!form.bio.trim()) next.bio = "A short bio is required.";
    return next;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
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
            Register your Organization
          </h1>
          <p className="text-gray-500 mb-8 text-sm leading-relaxed">
            Shelters, food banks, charities, and community centers — list your
            organization on NextSpark so local donors can find and support you.
          </p>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-gray-700"
              >
                Email address <span className="text-orange-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="contact@yourorg.org"
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-0.5">{errors.email}</p>
              )}
            </div>

            {/* Location */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="location"
                className="text-sm font-semibold text-gray-700"
              >
                Location <span className="text-orange-500">*</span>
              </label>
              <input
                id="location"
                name="location"
                type="text"
                value={form.location}
                onChange={handleChange}
                placeholder="City, State or full address"
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
              />
              {errors.location && (
                <p className="text-xs text-red-500 mt-0.5">{errors.location}</p>
              )}
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="bio"
                className="text-sm font-semibold text-gray-700"
              >
                About your organization <span className="text-orange-500">*</span>
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={4}
                value={form.bio}
                onChange={handleChange}
                placeholder="Tell donors what your organization does and what kinds of donations you accept…"
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition resize-none"
              />
              {errors.bio && (
                <p className="text-xs text-red-500 mt-0.5">{errors.bio}</p>
              )}
            </div>

            <button
              type="submit"
              className="mt-2 rounded-full bg-orange-500 text-white py-3 text-sm font-semibold shadow hover:bg-orange-600 transition-colors"
            >
              Register Organization
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-400">
            Are you an individual donor?{" "}
            <Link
              href="/signup/donor"
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
