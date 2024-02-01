/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens:{
      'laptop':'1024px',
      'tablet':'640px'
    },
    colors:{
      "background": '#121212',
      'white':'#FFFFFF',
      'purple':'#BB86FC',
      'gray':'#1f1b24'
    },
    extend: {},
  },
  plugins: [],
}