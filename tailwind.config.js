/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "siva-800": "#1f2937",
        "siva-100": "#f3f4f6",
        "bordo-500": "#7f1d1d",
        "bordo-400": "#991b1b",
      },
    },
  },
  plugins: [],
};
