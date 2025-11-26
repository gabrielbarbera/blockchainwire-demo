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
        // Default theme (Cyan/Teal)
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
        // Wire theme (Lime Green accent - adjusted for better contrast)
        wire: {
          accent: {
            DEFAULT: '#32CD32', // LimeGreen - better contrast than #39FF14
            hover: '#28C028',
            light: '#90EE90', // LightGreen
            dark: '#228B22', // ForestGreen
            bright: '#39FF14', // Original bright for highlights
          },
          bg: {
            DEFAULT: '#1E293B', // Slate-800
            light: '#2D3748', // Slate-700
            lighter: '#374151', // Gray-700
            dark: '#0F172A', // Slate-900
            'light-mode': '#F1F5F9', // Slate-100 for light mode (softer than Slate-50)
          },
          text: {
            DEFAULT: '#FFFFFF',
            secondary: '#E5E7EB', // Gray-200
            muted: '#9CA3AF', // Gray-400
            dark: '#111827', // Gray-900 for light mode (darker for better contrast)
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

