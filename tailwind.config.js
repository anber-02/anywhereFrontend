/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{html,ts}",],
  theme: {
    extend: {
      boxShadow: {
        'fuchsia': '1px 1px 5px -2px rgba(217,70,239)'
      }
    },
  },
  plugins: [],
}
