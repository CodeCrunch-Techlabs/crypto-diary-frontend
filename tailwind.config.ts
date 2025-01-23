// import type { Config } from "tailwindcss";

// export default {
//   darkMode: 'class',
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         primary: "#00FF88", // Custom primary color
//         secondary: "#FFFFFF", // Light theme text color
//         green: {
//           300: '#86efac',
//           400: '#4ade80',
//           500: '#22c55e',
//           600: '#16a34a',
//           700: '#15803d',
//         },
//       },
//     },
//   },
//   plugins: [],
// } satisfies Config;

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Ensure this is set to 'class'
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Adjust based on your file structure
  ],
  theme: {
    extend: {
      colors: {
        // Add custom colors if needed
        green: {
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        border: {
          DEFAULT: '#4ade80', // Use green border as default
          dark: '#4ade80', // Specific for dark mode
          light: '#d1d5db', // Specific for light mode
        },
      },
    },
  },
  plugins: [],
};
