/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF4B3A", // Updated to the exact "Food Express" red
        secondary: "#F8F9FA",
        dark: "#1A1A1A",
        surface: "#FDFDFD",
      },
      borderRadius: {
        '3xl': '2rem', // Matches the very rounded cards in your design
        '2xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 10px 40px rgba(0,0,0,0.03)',
      }
    },
  },
  plugins: [],
}