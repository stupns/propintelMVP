import React from 'react';

const HeaderSection = () => {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="w-full bg-transparent absolute top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-4 flex items-center justify-between">
        {/* Лого */}
        <div className="flex items-center gap-2">
          <img src="/images/logo-short.png" alt="Logo" className="h-10 w-auto" />
          <img src="/images/text-logo.png" alt="Logo" className="h-10 w-auto" />
          {/*<span className="text-xl font-semibold text-white">PropIntel</span>*/}
        </div>

        {/* Меню */}
        <div className="flex gap-4">
          <button
            onClick={() => scrollToSection('chat-section')}
            className="px-4 py-2 text-sm font-medium text-white border border-white rounded hover:bg-white hover:text-black transition"
          >
            Test the Demo
          </button>
          <button
            onClick={() => scrollToSection('early-access')}
            className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-amber-400 via-green-400 to-emerald-400 text-black rounded hover:opacity-90 transition"
          >
            Sign Up for Early Access
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderSection;