// app/donate/page.tsx
"use client";

import { useState } from "react";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";
import PaystackButtonInline from "../ui/PaystackButtonInline";

export default function DonatePage() {
  const [email, setEmail] = useState("");
  const [customAmount, setCustomAmount] = useState<number | "">("");

  const emailValid = !!email && /\S+@\S+\.\S+/.test(email);
  const canDonateCustom = emailValid && typeof customAmount === "number" && customAmount > 0;

  return (
    <div className="min-h-screen bg-[#1b1b1b]">
      <Navbar />
      <div className="pt-20 px-4 lg:px-20 xl:px-45 mb-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Support Our Mission</h1>

          {/* Capture donor email once for all buttons */}
          <div className="bg-gray-800 p-6 rounded-lg mb-8">
            <label className="block text-white font-semibold mb-2">Your Email (for receipt)</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600"
            />
            {!emailValid && email.length > 0 && (
              <p className="text-red-400 text-sm mt-2">Please enter a valid email.</p>
            )}
          </div>

          <div className="text-white space-y-8">
            <p className="text-lg">
              Your donation helps us continue our mission of serving the community through radio programming,
              educational initiatives, and community development projects.
            </p>

            {/* Fixed amounts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { amt: 25, desc: "Supports one day of community programming" },
                { amt: 50, desc: "Helps fund youth empowerment programs" },
                { amt: 100, desc: "Contributes to health outreach initiatives" },
              ].map(({ amt, desc }) => (
                <div key={amt} className="bg-gray-800 p-6 rounded-lg text-center">
                  <h3 className="text-xl font-bold mb-3">${amt}</h3>
                  <p className="mb-4">{desc}</p>
                  {emailValid && email.length > 0 ? (<PaystackButtonInline
                    amount={amt}
                    email={email}
                    label={`Donate $${amt}`}
                    currency="USD" // change to "NGN" if your account is Naira-based
                    onVerified={({ reference }) => {
                      // Optional: route to a thank-you page or show a toast
                      console.log("Verified ref:", reference);
                    }}
                  />)
                 : (
                    <button
                      disabled
                      className="cursor-not-allowed opacity-60  bg-[#03A0B4] text-white px-6 py-2 rounded"
                    >
                      Donate
                    </button>
                  )
                  
                  }
                </div>
              ))}
            </div>

            {/* Custom amount */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Other Amount</h3>
              <p className="mb-4">Choose your own donation amount to support our community programs.</p>
              <div className="flex flex-col md:flex-row  gap-4">
                <input
                  type="number"
                  min={1}
                  placeholder="Enter amount"
                  value={customAmount}
                  onChange={(e) => {
                    const v = e.target.value;
                    setCustomAmount(v === "" ? "" : Number(v));
                  }}
                  className="w-full h-full md:w-1/2 px-4 py-2 bg-gray-700 text-white rounded border border-gray-600"
                />
                <div>
                  {canDonateCustom ? (
                    <PaystackButtonInline
                      amount={Number(customAmount)}
                      email={email}
                      label="Donate"
                      currency="USD"
                      onVerified={({ reference }) => {
                        console.log("Verified ref:", reference);
                      }}
                    />
                  ) : (
                    <button
                      disabled
                      className="cursor-not-allowed opacity-60  bg-[#03A0B4] text-white px-6 py-2 rounded"
                    >
                      Donate
                    </button>
                  )}
                </div>
              </div>
              {!emailValid && email.length > 0 && (
                <p className="text-red-400 text-sm mt-2">Enter a valid email to proceed.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
