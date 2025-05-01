import {heroui} from '@heroui/theme';
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(button|input|progress|toggle|toast|ripple|spinner|form).js"
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

