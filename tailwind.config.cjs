/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#35BACF',
          hover: '#2EA5B8',
          light: '#E0F6F9',
        },
        secondary: {
          black: '#000000',
          dark: '#353535',
          medium: '#9B9B9B',
          light: '#E5E6E6',
          white: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

