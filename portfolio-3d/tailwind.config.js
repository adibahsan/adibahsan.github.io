/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /** The dark ground. Mirrored by the pre-paint style in index.html. */
        ground: '#0C0C0C',
        /** The pale type and hairline colour that sits on it. */
        foreground: '#D7E2EA',
      },
      fontFamily: {
        sans: ['Kanit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
