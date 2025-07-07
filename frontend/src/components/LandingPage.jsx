import React from 'react';
import { useState } from 'react';
import ChatConsultant from './ChatConsultant';
import HeaderSection from './HeaderSection';

const LandingPage = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div
      className="relative text-white bg-cover bg-center "
      style={{ backgroundColor: '#0a0a0a' }}
    >
      <HeaderSection />

      {/* Hero Section with logo and heading */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 py-24 text-center">
        <div className="absolute inset-0 bg-black bg-opacity-40 z-0 " />

        <div className="relative z-10 flex flex-col items-center  m-[10%_0]">
          <img
            src="/images/logo-brand.png"
            alt="Logo"
            className="w-3/4 h-auto mb-6 sm:w-1/2"
          />
          {/*<p*/}
          {/*  className="italic text-center text-white/70 text-lg md:text-xl font-light mb-10"*/}
          {/*  style={{ fontFamily: 'Raleway, sans-serif' }}*/}
          {/*>*/}
          {/*  Where Intelligence Shapes Assets, and Assets Shape Empires.*/}
          {/*</p>*/}

          <h1 className="m-[10%_0] text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-yellow-200 via-white to-emerald-400 bg-clip-text text-transparent mb-6 text-center">
            Your Personal AI-Powered Property Consultant
          </h1>

          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8">
            Say goodbye to endless scrolling. We match you with properties that fit your
            lifestyle, budget, and vision—instantly.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#chat-section"
              className="px-6 py-3 rounded bg-emerald-500 text-black font-medium hover:opacity-90 transition"
            >
              Test the Demo
            </a>
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 rounded border border-white text-white hover:bg-white hover:text-black transition"
            >
              Sign Up for Early Access
            </button>
          </div>
        </div>
      </section>


      <section
        id="chat-section"
        className="relative z-10 w-full flex justify-center py-20 bg-inherit"
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 z-0" />
        <div className="relative z-10 w-full max-w-6xl px-4">
          <ChatConsultant />
        </div>
      </section>

      {/* Early Access секція */}
      <section
        id="early-access"
        className="relative z-10 py-24 px-6 bg-rich-black text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-green-200 to-emerald-400">
          Get Early Access
        </h2>
        <p className="text-lg mb-6 text-white/90">
          Be the first to experience smarter property consulting.
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 text-sm font-medium bg-gradient-to-r from-green-400 to-emerald-500 text-black rounded hover:opacity-90 transition"
        >
          Sign Up for Early Access
        </button>
      </section>
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-[#111] border border-emerald-400 rounded-lg p-8 w-[90%] max-w-md text-white relative">
            <h2 className="text-xl font-semibold mb-4 text-emerald-300">Join Early Access</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 bg-black border border-gray-700 rounded text-white placeholder-gray-400"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-2 bg-black border border-gray-700 rounded text-white placeholder-gray-400"
              />
              <textarea
                placeholder="Why are you interested?"
                className="w-full px-4 py-2 bg-black border border-gray-700 rounded text-white placeholder-gray-400"
                rows="4"
              ></textarea>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;