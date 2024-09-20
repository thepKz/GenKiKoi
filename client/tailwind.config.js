/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "Pro-Rounded": ["Pro-Rounded", "sans-serif"],
      },
      colors: {
        "blue-primary": "#0c3c54",
        "blue-secondary": "#0F7EA9",
        "green-dark": "#006478",
      },
    },
  },
  plugins: [],
};
