import React from "react";

export default function ContactSection() {
  return (
    <section className="w-full mt-15 bg-gradient-to-br from-green-900 via-green-950 to-black py-20 px-6 md:px-12 lg:px-20 text-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT TEXT SECTION */}
        <div className="space-y-6 animate-fadeInUp">
          <h2 className="text-4xl font-bold">Need help? 💬</h2>

          <p className="text-gray-300">
            We’re here for you. Reach out anytime.
          </p>
        </div>

        {/* RIGHT FORM CARD */}
        <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl p-8 md:p-10 text-gray-800 animate-fadeIn">
          <form className="space-y-6">
            {/* TWO-COLUMN INPUT ROW */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                {/* TWO-COLUMN INPUT ROW */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="email"
                      placeholder="Email..."
                      className="w-full border-b border-gray-400 focus:border-green-600
                             focus:outline-none py-2 placeholder-gray-500"
                    />
                  </div>
                </div>

                {/* TEXTAREA */}
                <div>
                  <textarea
                    rows="4"
                    placeholder="Additional Information..."
                    className="w-full border-b border-gray-400 focus:border-green-600 
                           focus:outline-none py-2 placeholder-gray-500 resize-none"
                  ></textarea>
                </div>

                {/* SUBMIT BUTTON */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full border border-green-600 text-green-700 
                           rounded-md py-3 cursor-pointer font-medium hover:bg-green-600
                           hover:text-white transition-all duration-300"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
