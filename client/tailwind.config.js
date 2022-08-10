/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "node_modules/daisyui/dist/**/*.js"],
  theme: {
    extend: {
      colors: {
        'night': '#3ABFF8',
        'day': '#057AFF',
      },
    },
  },
  plugins: [require("daisyui")],
};
