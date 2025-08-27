module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}"],
  theme: { extend: {} },
  plugins: [require("@tailwindcss/typography"), require('tailwind-scrollbar-hide')],
};
