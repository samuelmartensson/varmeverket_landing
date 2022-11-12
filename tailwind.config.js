/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      GTAmericaExpandedRegular: ["GT America Expanded", "sans-serif"],
      GtAmericaCompressed: ["GT America Compressed", "sans-serif"],
      GtAmericaMono: ["GT America Mono", "sans-serif"],
      GtAmerica: ["GT America", "sans-serif"],
      GtAmericaExpandedBlack: ["GT America Expanded Black", "sans-serif"],
      GtAmericaExtended: ["GT America Extended", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
