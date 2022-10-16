/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      mobile: "0",

      tablet: "426px",
      // => @media (min-width: 100px) { ... }

      laptop: "836px",
      // => @media (min-width: 800px) { ... }

      desktop: "1025px",

      desktop4k: "1441px",
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
};
