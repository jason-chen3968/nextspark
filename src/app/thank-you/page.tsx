import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thanks for signing up! – NextSpark",
};

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col">
      {/* Navbar */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-orange-100">
        <Link href="/" className="text-2xl font-bold text-orange-500 tracking-tight">
          NextSpark
        </Link>
      </header>

      {/* Content */}
      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-10 text-center flex flex-col items-center gap-6">
          {/* Spark icon */}
          <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-4xl">
            🔥
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900">
            You&apos;re on the list!
          </h1>

          <p className="text-gray-600 leading-relaxed text-sm">
            Thanks for your interest in <strong>NextSpark</strong>! We&apos;re
            still building the full app and aren&apos;t open for business quite
            yet. You&apos;ll be among the first to know when we launch.
          </p>

          <div className="bg-orange-50 border border-orange-200 rounded-xl px-6 py-4 text-sm text-orange-700 leading-relaxed">
            <strong>Heads up:</strong> This is a landing page only — the
            NextSpark app is not yet live. No account has been created and no
            personal data has been stored. Stay tuned!
          </div>

          <Link
            href="/"
            className="mt-2 rounded-full bg-orange-500 text-white px-8 py-3 text-sm font-semibold shadow hover:bg-orange-600 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
