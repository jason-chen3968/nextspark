import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Navbar */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-orange-100">
        <span className="text-2xl font-bold text-orange-500 tracking-tight">
          NextSpark
        </span>
        <nav className="flex gap-6 text-sm font-medium text-gray-600">
          <a href="#how-it-works" className="hover:text-orange-500 transition-colors">
            How It Works
          </a>
          <a href="#signup" className="hover:text-orange-500 transition-colors">
            Sign Up
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 py-24 gap-6 max-w-3xl mx-auto">
        <span className="bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
          Coming Soon
        </span>
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
          Spark a donation.
          <br />
          <span className="text-orange-500">Change a life.</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
          <strong>NextSpark</strong> picks up donated goods from your door and
          delivers them to the shelters, food banks, and organizations that need
          them most — all for a small fee. We also help you discover the right
          place to donate based on your location, travel range, and what
          you&apos;re giving away.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4" id="signup">
          <Link
            href="/signup/donor"
            className="rounded-full bg-orange-500 text-white px-8 py-3 text-base font-semibold shadow hover:bg-orange-600 transition-colors"
          >
            I&apos;m a Donor
          </Link>
          <Link
            href="/signup/organization"
            className="rounded-full border-2 border-orange-500 text-orange-500 px-8 py-3 text-base font-semibold hover:bg-orange-50 transition-colors"
          >
            I&apos;m an Organization
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="bg-white py-20 px-6"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How NextSpark Works
          </h2>
          <div className="grid sm:grid-cols-3 gap-10 text-center">
            {[
              {
                step: "1",
                title: "Sign Up",
                body: "Create a free donor or organization account in seconds.",
              },
              {
                step: "2",
                title: "Get Matched",
                body: "We recommend nearby donation centers based on what you have and how far you can go.",
              },
              {
                step: "3",
                title: "We Deliver",
                body: "Schedule a pickup and we handle the rest — getting your goods where they belong.",
              },
            ].map(({ step, title, body }) => (
              <div key={step} className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-500 font-bold text-xl flex items-center justify-center">
                  {step}
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-10 text-gray-400 text-sm border-t border-gray-100">
        © {new Date().getFullYear()} NextSpark. All rights reserved.
      </footer>
    </div>
  );
}

