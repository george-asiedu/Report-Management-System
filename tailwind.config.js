/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#244084',
        'secondary': '#6B7280',
        'black': '#111',
      }
    },
  },
  plugins: [],
}