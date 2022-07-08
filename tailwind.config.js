/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./projects/**/*.{html,ts,css}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")({
    strategy: 'class', // only generate classes
  })],
};
