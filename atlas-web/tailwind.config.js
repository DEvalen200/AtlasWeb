/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'mobile': '420px',
      // => @media (min-width: 640px) { ... }

      'desktop': '1201px',
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
}
