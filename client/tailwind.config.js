/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/index.html"],
  theme: {
    extend: {
      backgroundImage: {
        'login': "url('../public/background.png')"
      }
    },
  },
  plugins: [],
}

