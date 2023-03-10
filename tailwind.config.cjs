/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage:{
        'Stroke' : "url(./src/Pages/assets/Images/Stroke.png)"
      }
    },
  },
  plugins: [],
}
