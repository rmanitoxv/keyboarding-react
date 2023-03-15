/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    fontFamily: {
      neonderthaw: 'Neonderthaw',
      raleway: 'Raleway',
      poppins: 'Poppins'
      
    },
    extend: {
      backgroundImage: {
        'mainmenu': "url('/images/background.svg')",
      }
    }

  },
  plugins: [],
}
