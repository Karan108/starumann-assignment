/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        "5pe": "5%",
        "95pe": "95%",
      },
      colors: {
        grey: "#BDBDBD",
        lightGrey: "#f5f5f5",
        // Add more custom colors as needed
      },
    },
  },
  plugins: [],
};
