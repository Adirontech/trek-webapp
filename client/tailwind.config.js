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
        'checkin': "url('./assets/images/checkin-background.jpg')",
        'BJW_1': "url('./assets/images/BJW_1.jpg')",
        'BJW_2': "url('./assets/images/BJW_2.jpg')",
        'BJW_3': "url('./assets/images/BJW_3.jpg')",
        'BJW_4': "url('./assets/images/BJW_4.jpg')",
        'BJW_5': "url('./assets/images/BJW_5.jpg')",
        'BJW_6': "url('./assets/images/BJW_6.jpg')",
        'BJW_7': "url('./assets/images/BJW_7.jpg')",
        'BJW_8': "url('./assets/images/BJW_8.jpg')",
        'BJW_9': "url('./assets/images/BJW_9.jpg')",
        'BJW_10': "url('./assets/images/BJW_10.jpg')",
        'BJW_11': "url('./assets/images/BJW_11.jpg')",
        'BJW_12': "url('./assets/images/BJW_12.jpg')",
        'BJW_13': "url('./assets/images/BJW_13.jpg')",
        'BJW_14': "url('./assets/images/BJW_14.jpg')",
        'BJW_15': "url('./assets/images/BJW_15.jpg')",
        'BJW_16': "url('./assets/images/BJW_16.jpg')",
        'BJW_17': "url('./assets/images/BJW_17.jpg')",
        'BJW_18': "url('./assets/images/BJW_18.jpg')"
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
