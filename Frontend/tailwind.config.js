/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      margin: {
        "5px": "5px",
      },
      spacing: {
        "5px": "5px",
      },
      minHeight: {
        128: "32rem",
      },
      spacing: {
        128: "32rem",
      },
    },
  },
  plugins: [require("daisyui")],
};
