/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      animation: {
        'gradient-x': 'gradient-x 5s ease infinite',
        'fade-in-up': 'fade-in-up 0.8s ease-out both',
        'expand-full': 'expand-full 0.3s ease-in-out forwards',
        'fade-in': 'fade-in 0.8s ease-out both',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'expand-full': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      colors: {
        'emerald-deep': '#0F2B24',
        'emerald-main': '#1A4F41',
        'gold-muted': '#B99E64',
        'rich-black': '#0C0C0C',
        'graphite': '#2F2F2F',
        'ivory': '#F3F2ED',

        // 🌿 BRAND COLORS
        'brand-cream': '#f3f0e6',
        'brand-mint': '#75baae',
        'brand-seafoam': '#88c1b6',
        'brand-mist': '#9cc8bf',
        'brand-cloud': '#b0d0c8',
      },

      // ✅ Global default for `focus:ring` (highlight on input/button focus)
      ringColor: {
        DEFAULT: '#88c1b6', // brand-seafoam
      },

      fontFamily: {
        sans: ['Urbanist', 'sans-serif'],
      },
    },
  },
  plugins: [],
}