/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/index.html"],
  theme: {
    extend: {
      backgroundImage: {
        'login': "url('./assets/images/login-background.png')",
        'circle_logo': "url('./assets/images/circle_logo.png')"
      }
    },
  },
  plugins: [],
}

