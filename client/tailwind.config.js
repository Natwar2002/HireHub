import {heroui} from '@heroui/theme';
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(button|input|pagination|progress|toggle|table|toast|ripple|spinner|form|checkbox|spacer).js"
  ],
  theme: {
    extend: {
      fontFamily: {
        cabinet: ['Cabinet Ghostrick', 'sans-serif'],
    },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
}

