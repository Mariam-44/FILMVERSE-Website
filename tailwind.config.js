/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#ff2c2c", // Lightest shade
          100: "#ff1515", // Base color
          200: "#ff1515",
          300: "#e61313",
          400: "#cc1111",
          500: "#b30f0f",
          600: "#990d0d",
          700: "#800b0b",
          800: "#660808",
          900: "#4c0606", // Darkest shade
        },
        textColor : "#ffffff",
        bgColor : "#111111",
        grayColor:"#78828A"
      },
      screens: {
        "2xl": "1320px",
      },
    },
  },
  plugins: [],
};
