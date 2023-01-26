/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ok': '#3ccf9b',
        'ok-hover': '#1ff2a1',
        'error': '#f2526e'
      }
    },
  },
  plugins: [],
}
