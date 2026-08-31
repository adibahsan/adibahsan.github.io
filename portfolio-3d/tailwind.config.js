/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /**
         * The dark ground. Mirrored by the pre-paint style in index.html.
         *
         * Named for the role it holds over most of the page, but it is the
         * value that is shared: the services panel inverts, and there the same
         * #0C0C0C is the ink and its hairlines. One token rather than a second
         * name for the same hex that could drift from this one.
         */
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
