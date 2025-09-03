/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f6f0ff",
          100: "#ebd8ff",
          200: "#d5b1ff",
          300: "#b880ff",
          400: "#9a4ffd",
          500: "#7b23f4",
          600: "#6a12dc",
          700: "#5710b2",
          800: "#451089",
          900: "#37126b",
        },
      },
      borderRadius: {
        "2xl": "1rem",
      }
    },
  },
  plugins: [],
};
