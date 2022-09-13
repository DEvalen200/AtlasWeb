/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'mobile': '0px',
      // => @media (min-width: 100px) { ... }

      'tablet': '600px',
      // => @media (min-width: 800px) { ... }

      'desktop': '1200px',
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
}
