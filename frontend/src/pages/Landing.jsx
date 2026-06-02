import {
  ArrowRight,
  ShieldCheck,
  Globe,
  Wallet,
  Clock3,
  Star,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Landing() {
  const features = [
    {
      icon: <Clock3 size={28} />,
      title: "Instant Transfers",
      description:
        "Send money across the globe in minutes with real-time tracking.",
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Bank-Level Security",
      description:
        "Your funds and personal data are protected by advanced encryption.",
    },
    {
      icon: <Globe size={28} />,
      title: "100+ Countries",
      description:
        "Transfer money to friends, family, and businesses worldwide.",
    },
    {
      icon: <Wallet size={28} />,
      title: "Lowest Fees",
      description: "Transparent pricing with no hidden charges or surprises.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      text: "The fastest transfer service I've ever used. Money arrived in less than 2 minutes.",
    },
    {
      name: "David Chen",
      text: "Exchange rates are significantly better than my bank. Highly recommended.",
    },
    {
      name: "Priya Sharma",
      text: "Clean interface, transparent fees, and amazing customer support.",
    },
  ];

  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const endpoint = isSignIn
        ? "http://localhost:3000/api/v1/user/signin"
        : "http://localhost:3000/api/v1/user/signup";

      const payload = isSignIn
        ? { username, password }
        : { username, password, firstName, lastName };

      const response = await axios.post(endpoint, payload);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-slate-700 p-2 text-white font-bold">
              $
            </div>
            <button
              onClick={() => {
                navigate("/");
              }}
              className="text-xl font-bold"
            >
              TransferX
            </button>
          </div>

          <nav className="hidden gap-8 md:flex">
            <a href="#features" className="hover:text-slate-800">
              Features
            </a>
            <a href="#how" className="hover:text-slate-800">
              How It Works
            </a>
            <a href="#reviews" className="hover:text-slate-800">
              Reviews
            </a>
          </nav>

          <Menu className="md:hidden" />
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-slate-50 via-white to-cyan-50" />

        <div className="relative mx-auto max-w-7xl px-6 py-24">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="rounded-full bg-slate-700 px-4 py-2 text-sm font-medium text-white">
                Trusted by 1 Million+ customers
              </span>

              <h1 className="mt-8 text-5xl font-bold leading-tight md:text-7xl">
                Send money globally
                <span className="block text-slate-700">
                  without hidden fees
                </span>
              </h1>

              <p className="mt-6 text-xl text-slate-600">
                Fast, secure, and affordable international transfers. Get the
                best exchange rates and track every payment in real time.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <button className="rounded-2xl bg-black px-8 py-4 font-semibold text-white transition hover:bg-black-700">
                  Send Money
                </button>

                <button className="flex items-center gap-2 rounded-2xl border px-8 py-4 font-semibold">
                  View Rates
                  <ArrowRight size={18} />
                </button>
              </div>

              <div className="mt-10 flex gap-8 text-sm text-slate-600">
                <span>✓ No hidden fees</span>
                <span>✓ Real-time tracking</span>
                <span>✓ 24/7 support</span>
              </div>
            </div>
            {/* Calculator Card */}
            <div className="mx-auto w-full max-w-md">
              <div className="rounded-3xl bg-white p-8 shadow-2xl">
                <h3 className="mb-6 text-2xl font-bold">
                  {isSignIn ? "Sign In" : "Sign Up"}
                </h3>

                <div className="space-y-5">
                  {!isSignIn && (
                    <>
                      <div>
                        <label className="mb-2 block text-sm text-slate-500">
                          First Name
                        </label>

                        <input
                          onChange={(e) => {
                            setFirstName(e.target.value);
                          }}
                          className="w-full rounded-xl border p-4 text-lg font-semibold"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm text-slate-500">
                          Last Name
                        </label>

                        <input
                          onChange={(e) => {
                            setLastName(e.target.value);
                          }}
                          className="w-full rounded-xl border p-4 text-lg font-semibold"
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label className="mb-2 block text-sm text-slate-500">
                      Email
                    </label>

                    <input
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                      className="w-full rounded-xl border p-4 text-lg font-semibold"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-500">
                      Password
                    </label>

                    <input
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      className="w-full rounded-xl border p-4 text-lg font-semibold"
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full rounded-xl bg-black py-4 font-semibold text-white hover:bg-slate-800"
                  >
                    {isSignIn ? "Sign In" : "Sign Up"}
                  </button>
                  <div className="text-center text-sm">
                    {isSignIn ? (
                      <>
                        Don't have an account?{" "}
                        <button
                          onClick={() => setIsSignIn(false)}
                          className="font-bold text-slate-800 hover:underline"
                        >
                          Sign Up
                        </button>
                      </>
                    ) : (
                      <>
                        Already have an account?{" "}
                        <button
                          onClick={() => setIsSignIn(true)}
                          className="font-bold text-slate-800 hover:underline"
                        >
                          Sign In
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-slate-50">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-16 md:grid-cols-4">
          <div>
            <h3 className="text-4xl font-bold">$15B+</h3>
            <p className="text-slate-600">Transferred Monthly</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">100+</h3>
            <p className="text-slate-600">Countries Supported</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">1M+</h3>
            <p className="text-slate-600">Customers</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">99.99%</h3>
            <p className="text-slate-600">Successful Transfers</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <span className="font-semibold text-black">Features</span>

            <h2 className="mt-4 text-5xl font-bold">Everything you need</h2>

            <p className="mt-4 text-slate-600">
              Built for individuals and businesses sending money worldwide.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-3xl border p-8 transition hover:shadow-lg"
              >
                <div className="mb-5 inline-flex rounded-2xl bg-black-100 p-4 text-black">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold">{feature.title}</h3>

                <p className="mt-3 text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how" className="bg-slate-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-5xl font-bold">How it works</h2>

          <div className="mt-16 grid gap-8 md:grid-cols-4">
            {[
              "Create Account",
              "Verify Identity",
              "Add Recipient",
              "Send Money",
            ].map((step, index) => (
              <div
                key={step}
                className="rounded-3xl bg-slate-100 p-8 text-center"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-black text-xl font-bold text-white">
                  {index + 1}
                </div>

                <h3 className="font-bold">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-5xl font-bold">Loved by customers</h2>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {testimonials.map((review) => (
              <div key={review.name} className="rounded-3xl border p-8">
                <div className="mb-4 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={18}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-slate-600">"{review.text}"</p>

                <div className="mt-6 font-semibold">{review.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black-600 py-24 text-black">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-5xl font-bold">
            Ready to transfer money smarter?
          </h2>

          <p className="mt-6 text-lg text-black-100">
            Join millions of users sending money around the world.
          </p>

          <button
            className="mt-10 rounded-2xl bg-white px-8 py-4 font-semibold text-black
          "
          >
            Get Started Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-slate-500">
          © 2026 TransferX. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
