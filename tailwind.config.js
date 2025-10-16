/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {},
      colors: {
        primary: "#FF385C",
        grey: "#ABABAB",
        dark: "#1A1A1A",
        white: "#FFFFFF",
        blue: "#007AFF",
        gray300: "#E0E0E0",
        yellow: "#FFC107",
      },
    },
  },
  plugins: [],
};
