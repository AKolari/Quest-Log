/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        Gunmetal: "#1B2F33",
        Chocolate: "#3E000C",
        Silver: "#A5A5A5",
        "Black-Smoke": "#140901",
        "White-Smoke": "#F2F2F2",
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        Medieval: ['MedievalSharp', 'cursive'],
        Testing: ['Libre Caslon Display', 'serif']


      },
    },
  },
  plugins: [],
};
