/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        darkBlue_darkElement: "hsl(209, 23%, 22%)",
        veryDarkBlue_darkBg: "hsl(207, 26%, 17%)",
        veryDarkBlue_lightText: "hsl(200, 15%, 8%)",
        darkGray_lightInput: "hsl(0, 0%, 52%)",
        veryLightGray_lightBg: "hsl(0, 0%, 98%)",
      },
      gridTemplateColumns: {
        autoFill: "repeat(auto-fill,minmax(16rem,1fr))",
      },
    },
  },
  plugins: [],
};
