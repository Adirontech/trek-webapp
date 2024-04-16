/**
 * tailwind.config.js - Tailwind CSS configuration file.
 * This file defines the configuration for Tailwind CSS including theme customization, content paths, and plugins.
 */

/** 
 * Importing the Config type from 'tailwindcss' module to provide type definitions.
 * This helps in providing autocompletion and type-checking support in IDEs.
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  // Defining content paths for Tailwind CSS to scan for classes in JavaScript, TypeScript, JSX, TSX files, and HTML files
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/index.html"],
  // Theme customization for extending or overriding default Tailwind CSS theme
  theme: {
    extend: {
      // Extending background images with custom aliases for easy usage
      backgroundImage: {
        'login': "url('./assets/images/login-background.png')", // Alias for login background image
        'circle_logo': "url('./assets/images/circle_logo.png')", // Alias for circle logo background image
        'home': "linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url('./assets/images/homepage-hero.png')", // Alias for homepage hero background image with linear gradient overlay
        'checkin': "url('./assets/images/checkin-background.jpg')"
      }
    },
    // Customizing colors with aliases for easy usage
    colors: {
      'white': '#ffffff', // Alias for white color
      'green': '#378B35', // Alias for green color
      'black': '#000000', // Alias for black color
      'red': '#FF0000', // Alias for red color
      'gray': '#d1d5db', // Alias for gray color
    }
  },
  // Plugins configuration (if any)
  plugins: [],
}
