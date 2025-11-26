/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
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
          dark: '#1A8FA0',
        },
        secondary: {
          black: '#000000',
          dark: '#353535',
          medium: '#9B9B9B',
          light: '#E5E6E6',
          white: '#FFFFFF',
        },
        wire: {
          accent: {
            DEFAULT: '#32CD32',
            hover: '#28C028',
            light: '#90EE90',
            dark: '#228B22',
            bright: '#39FF14',
          },
          bg: {
            DEFAULT: '#1E293B',
            light: '#2D3748',
            lighter: '#374151',
            dark: '#0F172A',
            'light-mode': '#F1F5F9',
          },
          text: {
            DEFAULT: '#FFFFFF',
            secondary: '#E5E7EB',
            muted: '#9CA3AF',
            dark: '#111827',
          },
        },
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

