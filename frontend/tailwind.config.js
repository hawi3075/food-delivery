/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF1E1E", // The vibrant red from your UI
        secondary: "#F8F9FA",
        dark: "#1A1A1A",
      },
      borderRadius: {
        'xl': '1.5rem', // For those smooth card corners
      }
    },
  },
  plugins: [],
}