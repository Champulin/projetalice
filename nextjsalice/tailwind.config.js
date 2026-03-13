/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          bg: "#EDE7FF",
          surface: "#E6F4FF",
          primary: "#9F8CFF",
          secondary: "#FF9FCF",
          tertiary: "#FFB59A",
          navbarStart: "#C7B6FF",
          navbarEnd: "#8ED0FF",
          text: "#2B2E4A",
          muted: "#6B7A99",
          border: "#D6E6FF",
        },
      },
    },
  },
  plugins: [],
}